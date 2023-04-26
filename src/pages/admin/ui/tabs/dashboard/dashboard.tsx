import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as StatusNotOk } from 'shared/assets/icons/status-not-ok.svg'
import { ReactComponent as StatusOk } from 'shared/assets/icons/status-ok.svg'
import { Button, ButtonIcon, ButtonText, Card, CardDescription, CardTitle } from 'shared/ui'
import { ALPageContent, ALPageHeader } from '../../admin-layout/admin-layout'
import styles from './dashboard.module.scss'

export const Dashboard = () => {
    const { t } = useTranslation()

    useEffect(() => {
        window.document.title = t('admin-page.nav.dashboard')
    }, [])

    return (
        <>
            <ALPageHeader>
                <span>{t('welcome')},</span> Smurf_tv!
            </ALPageHeader>
            <ALPageContent className={styles.pageContent}>
                <div className={styles.statuses}>
                    <Card className={styles.status}>
                        <CardDescription style="green">{t('admin-page.dashboard.bot-status')}</CardDescription>
                        <CardTitle className={styles.statusText}>
                            {t('admin-page.dashboard.bot-status-connected')}
                        </CardTitle>
                        <div className={styles.statusButtons}>
                            <Button padding="big">
                                <ButtonText>{t('disable')}</ButtonText>
                            </Button>
                            <Button style="green" borderRadius="50%" width="50px" height="50px" alignment="center">
                                <ButtonIcon margin="none">
                                    <StatusOk />
                                </ButtonIcon>
                            </Button>
                        </div>
                    </Card>

                    <Card className={styles.status}>
                        <CardDescription style="red">{t('admin-page.dashboard.da-status')}</CardDescription>
                        <CardTitle className={styles.statusText}>
                            {t('admin-page.dashboard.da-status-not-connected')}
                        </CardTitle>
                        <div className={styles.statusButtons}>
                            <Button style="green" padding="big">
                                <ButtonText>{t('connect')}</ButtonText>
                            </Button>
                            <Button style="red" borderRadius="50%" width="50px" height="50px" alignment="center">
                                <ButtonIcon margin="none">
                                    <StatusNotOk />
                                </ButtonIcon>
                            </Button>
                        </div>
                    </Card>
                </div>
                <Card className={styles.emotes}></Card>
            </ALPageContent>
        </>
    )
}
