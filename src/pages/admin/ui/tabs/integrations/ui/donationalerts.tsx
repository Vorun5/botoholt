import { useEffect, useState } from 'react'
import { useDaServiceQeury, useToggleDaServiceMutation } from 'entities/admin-auth'
import { useDaServiceMutation } from 'entities/admin-auth/hooks/use-da-service-mutation'
import { DangerIcon } from 'shared/assets/icons'
import { DonationAlertsIcon } from 'shared/assets/icons/social'
import { useDocumentTitle, useToast } from 'shared/lib/hooks'
import { AdminAuth } from 'shared/types'
import {
    Button,
    ButtonText,
    Card,
    CardDescription,
    CardDivider,
    CardExpanded,
    CardFooter,
    CardTitle,
    InputField,
    Loading,
    Modal,
    PasswordFiled,
} from 'shared/ui'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import styles from '../integrations.module.scss'

interface DaModalProps {
    hide: () => void
    isShown: boolean
}

const DaModal = ({ isShown, hide }: DaModalProps) => {
    const { mutate: changeDaService, isLoading: isChangeDaLoading, isError: isDaChangeDaError } = useDaServiceMutation()
    const { data: daService, isLoading, isError, isSuccess } = useDaServiceQeury()
    const toast = useToast()
    const { t } = useTranslation()
    const [daTokenLink, setDaTokenLink] = useState(
        isSuccess ? `https://www.donationalerts.com/widget/media?token=${daService.daToken}` : '',
    )
    const [daLink, setDaLink] = useState(isSuccess ? daService.donationLink : '')

    useEffect(() => {
        if (isSuccess) {
            setDaLink(daService.donationLink)
            setDaTokenLink(`https://www.donationalerts.com/widget/media?token=${daService.daToken}`)
        }
    }, [isSuccess])

    const onSave = () => {
        const link = daLink.replace(/\s+/g, '')
        const tokenLink = daTokenLink.replace(/\s+/g, '')

        if (link.length === 0 || tokenLink.length === 0) {
            if (toast)
                toast.addToast(
                    { children: t('insert-link') },
                    { status: 'error', delayInSeconds: 3, position: 'top-right' },
                )
            return
        }
        if (
            link.length < 33 ||
            tokenLink.length < 50 ||
            link.slice(0, 33) !== 'https://www.donationalerts.com/r/' ||
            tokenLink.slice(0, 50) !== 'https://www.donationalerts.com/widget/media?token='
        ) {
            if (toast)
                toast.addToast(
                    { children: t('admin-page.integrations.da.invalid-links') },
                    { status: 'error', delayInSeconds: 3, position: 'top-right' },
                )
            return
        }
        changeDaService({
            daToken: tokenLink.slice(50, tokenLink.length),
            donationLink: link,
        })
    }

    return (
        <Modal
            isShown={isShown}
            hide={hide}
            dontHide={isChangeDaLoading}
            headerDivider
            expandedWidth
            footerDivider
            title={t('admin-page.integrations.da.title')!}
            footerContent={
                <center>
                    <Button loading={isChangeDaLoading} style="fill-blue" height="52px" onClick={onSave}>
                        <ButtonText>{t('save-changes')}</ButtonText>
                    </Button>
                </center>
            }
        >
            {isLoading && <Loading />}
            {(isSuccess || isError) && (
                <>
                    <h5 className={styles.daModalTitle}>
                        <DonationAlertsIcon width={26} height={30} />
                        <span>{t('admin-page.integrations.da.action')}</span>
                    </h5>
                    <Card style="red" padding="small" borderRadius="9px" className={styles.daModalWarning}>
                        <CardExpanded>
                            <DangerIcon />
                            <span>{t('dont-show-link')}</span>
                        </CardExpanded>
                    </Card>
                    <span className={styles.daModalClue}>
                        {t('admin-page.integrations.da.clue')}
                        <span> {t('admin-page.integrations.da.clue-path')}</span>
                    </span>
                    <PasswordFiled
                        placeholder="Example: https://www.donationalerts.com/widget/media?token=nabEtKP53aOU356NLh02"
                        value={daTokenLink}
                        onChange={(event) => {
                            event.preventDefault()
                            setDaTokenLink(event.target.value)
                        }}
                    />
                    <span
                        className={styles.daModalClue}
                        style={{
                            marginTop: '1rem',
                        }}
                    >
                        {t('admin-page.integrations.da.insert-da-link')}
                    </span>
                    <InputField
                        placeholder="Example: https://www.donationalerts.com/r/botoholt"
                        value={daLink}
                        onChange={(event) => {
                            event.preventDefault()
                            setDaLink(event.target.value)
                        }}
                    />
                    <br />
                </>
            )}
        </Modal>
    )
}

export const Donationalerts = ({ authData }: { authData: AdminAuth }) => {
    const { mutate: toggleDaService, isLoading: isToggleLoading } = useToggleDaServiceMutation()
    const { t } = useTranslation()
    useDocumentTitle(t('admin-page.nav.integrations'))

    const [daModalIsShown, setDaModalIsShow] = useState(false)
    const hideDaModal = () => setDaModalIsShow(false)

    return (
        <>
            <DaModal hide={hideDaModal} isShown={daModalIsShown} />
            <Card className={styles.card} padding="big">
                <CardDescription style={authData.services.da_api ? 'green' : 'red'}>
                    {t(
                        authData.services.da_api
                            ? 'admin-page.integrations.connected'
                            : 'admin-page.integrations.not-connected',
                    )}
                </CardDescription>
                <CardTitle className={clsx(styles.cardTitle)}>
                    <DonationAlertsIcon />
                    <span>Donation Alerts</span>
                </CardTitle>
                <CardExpanded>{t('admin-page.integrations.da.message')}</CardExpanded>
                <CardFooter>
                    <CardDivider />
                    <div className={styles.buttons}>
                        <Button
                            loading={isToggleLoading}
                            style={authData.services.da_api ? 'fill-red' : 'green'}
                            height="52px"
                            onClick={() => toggleDaService()}
                        >
                            <ButtonText>{t(authData.services.da_api ? 'disable' : 'connect')}</ButtonText>
                        </Button>
                        <Button style="blue" onClick={() => (isToggleLoading ? undefined : setDaModalIsShow(true))}>
                            <ButtonText>{t('change')}</ButtonText>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}
