import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DangerIcon } from 'shared/assets/icons'
import { DonationAlertsIcon, TwitchIcon } from 'shared/assets/icons/social'
import { useToast } from 'shared/lib/hooks'
import { Button, ButtonText, Card, CardDescription, CardDivider, CardTitle, Modal, PasswordFiled } from 'shared/ui'
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
    const onSave = () => {
        if (toast) {
            if (daLink.length) {
                toast.addToast({ children: daLink }, { status: 'success', delayInSeconds: 3 })
            } else {
                toast.addToast({ children: 'Insert link dumb' }, { status: 'error', delayInSeconds: 3 })
            }
        }
    }

    return (
        <Modal
            isShown={isShown}
            hide={hide}
            headerDivider
            expandedWidth
            footerDivider
            title={t('admin-page.integrations.da.title')!}
            footerContent={
                <center>
                    <Button style="fill-blue" height="52px" onClick={onSave}>
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
                <DangerIcon />
                <span>{t('dont-show-link')}</span>
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

export const Integrations = () => {
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
                <Card className={styles.card} padding="big">
                    <CardDescription style="green">{t('admin-page.integrations.connected')}</CardDescription>
                    <CardTitle className={clsx(styles.cardTitle)}>
                        <TwitchIcon color="#673AB7" />
                        <span>Twitch</span>
                    </CardTitle>
                    <div>Smurf_tv</div>
                    <CardDivider />
                    <Button height="52px">
                        <ButtonText>{t('disable')}</ButtonText>
                    </Button>
                </Card>
                <DaModal hide={hideDaModal} isShown={daModalIsShown} />
                <Card className={styles.card} padding="big">
                    <CardDescription style="red">{t('admin-page.integrations.not-connected')}</CardDescription>
                    <CardTitle className={clsx(styles.cardTitle)}>
                        <DonationAlertsIcon />
                        <span>Donation Alerts</span>
                    </CardTitle>
                    <div>{t('admin-page.integrations.da.message')}</div>
                    <CardDivider />
                    <Button style="green" height="52px" onClick={() => setDaModalIsShow(true)}>
                        <ButtonText>{t('connect')}</ButtonText>
                    </Button>
                </Card>
            </ALPageContent>
        </>
    )
}
