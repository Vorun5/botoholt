import { useEffect, useState } from 'react'
import { DangerIcon } from 'shared/assets/icons'
import { DonationAlertsIcon } from 'shared/assets/icons/social'
import { useToast } from 'shared/lib/hooks'
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
    Modal,
    PasswordFiled,
} from 'shared/ui'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { ALPageContent, ALPageHeader } from '../../admin-layout/admin-layout'

import styles from './integrations.module.scss'

interface DaModalProps {
    hide: () => void
    isShown: boolean
}

const DaModal = ({ isShown, hide }: DaModalProps) => {
    const toast = useToast()
    const { t } = useTranslation()
    const [daLink, setDaLink] = useState('')
    const [loading, setLoading] = useState(false)

    const onSave = () => {
        if (daLink.length === 0) {
            if (toast)
                toast.addToast(
                    { children: t('insert-link') },
                    { status: 'error', delayInSeconds: 3, position: 'top-right' },
                )
            return
        }

        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            if (toast)
                toast.addToast(
                    { children: t('link-saved"') },
                    { status: 'success', delayInSeconds: 3, position: 'top-right' },
                )
        }, 3000)
    }

    return (
        <Modal
            isShown={isShown}
            hide={hide}
            dontHide={loading}
            headerDivider
            expandedWidth
            footerDivider
            title={t('admin-page.integrations.da.title')!}
            footerContent={
                <center>
                    <Button loading={loading} style="fill-blue" height="52px" onClick={onSave}>
                        <ButtonText>{t('save-changes')}</ButtonText>
                    </Button>
                </center>
            }
        >
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
                placeholder={t('insert-link')!}
                value={daLink}
                width="300px"
                onChange={(event) => {
                    event.preventDefault()
                    setDaLink(event.target.value)
                }}
            />
            <br />
        </Modal>
    )
}

interface IntegrationsProps {
    streamer: AdminAuth
}

export const Integrations = ({ streamer }: IntegrationsProps) => {
    const { t } = useTranslation()

    useEffect(() => {
        window.document.title = t('admin-page.nav.integrations')
    }, [])

    const [daModalIsShown, setDaModalIsShow] = useState(false)
    const hideDaModal = () => setDaModalIsShow(false)

    return (
        <>
            <ALPageHeader description={t('admin-page.integrations.page-description')!}>
                {t('admin-page.nav.integrations')}
            </ALPageHeader>
            <ALPageContent className={styles.pageContent}>
                {/* <Card className={styles.card} padding="big">
                    <CardDescription style="green">{t('admin-page.integrations.connected')}</CardDescription>
                    <CardTitle className={clsx(styles.cardTitle)}>
                        <TwitchIcon color="#673AB7" />
                        <span>Twitch</span>
                    </CardTitle>
                    <CardExpanded>{streamer.name}</CardExpanded>
                    <CardFooter>
                        <CardDivider />
                        <Button height="52px">
                            <ButtonText>{t('disable')}</ButtonText>
                        </Button>
                    </CardFooter>
                </Card> */}
                <DaModal hide={hideDaModal} isShown={daModalIsShown} />
                <Card className={styles.card} padding="big">
                    <CardDescription style="red">{t('admin-page.integrations.not-connected')}</CardDescription>
                    <CardTitle className={clsx(styles.cardTitle)}>
                        <DonationAlertsIcon />
                        <span>Donation Alerts</span>
                    </CardTitle>
                    <CardExpanded>{t('admin-page.integrations.da.message')}</CardExpanded>
                    <CardFooter>
                        <CardDivider />
                        <Button style="green" height="52px" onClick={() => setDaModalIsShow(true)}>
                            <ButtonText>{t('connect')}</ButtonText>
                        </Button>
                    </CardFooter>
                </Card>
            </ALPageContent>
        </>
    )
}
