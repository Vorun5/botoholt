import clsx from 'clsx'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ThemeSwitcher } from 'features'
import { ReactComponent as StatusNotOk } from 'shared/assets/icons/status-not-ok.svg'
import { ReactComponent as StatusOk } from 'shared/assets/icons/status-ok.svg'
import { Button, ButtonIcon, ButtonText, Card, CardDescription, CardTitle } from 'shared/ui'
import { NavigationBar } from '../navigation-bar/navigation-bar'
import styles from './admin-page.module.scss'

export const AdminPage = () => {
    const { t } = useTranslation()

    useEffect(() => {
        window.document.title = 'Admin'
    }, [])

    return (
        <div className={styles.pageWrapper}>
            <NavigationBar />
            <div className={styles.page}>
                <div className={styles.pageBackground} />
                <header className={clsx(styles.pageHeader, styles.header)}>
                    <h1 className={styles.headerTitle}>
                        <span>{t('welcome')}, </span>Smurf_tv!
                    </h1>
                    <div className={styles.headerSetting}>
                        <div className={styles.settingsThemeSwitcher}>
                            <ThemeSwitcher short />
                        </div>
                    </div>
                </header>
                <div className={styles.pageContent}>
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
                </div>
            </div>
        </div>
    )
}
