import clsx from 'clsx'
import { useEffect } from 'react'
import { ThemeSwitcher } from 'features/index'
import { ReactComponent as StatusNotOk } from 'shared/assets/icons/status-not-ok.svg'
import { ReactComponent as StatusOk } from 'shared/assets/icons/status-ok.svg'
import { Button, ButtonIcon, ButtonText } from 'shared/ui'
import { NavigationBar } from '../navigation-bar/navigation-bar'
import styles from './admin-page.module.scss'

export const AdminPage = () => {
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
                        <span>Welcome, </span>Smurf_tv!
                    </h1>
                    <div className={styles.headerSetting}>
                        <div className={styles.settingsThemeSwitcher}>
                            <ThemeSwitcher short />
                        </div>
                    </div>
                </header>
                <div className={styles.pageContent}>
                    <div className={styles.statuses}>
                        <div className={styles.status}>
                            <h5 className={styles.statusTitle}>Статус бота</h5>
                            <span className={styles.statusText}>Всё работает исправно</span>
                            <div className={styles.statusButtons}>
                                <Button padding="big">
                                    <ButtonText>Отключить</ButtonText>
                                </Button>
                                <Button style="red" borderRadius="50%" width="50px" height="50px" alignment="center">
                                    <ButtonIcon margin="none">
                                        <StatusNotOk />
                                    </ButtonIcon>
                                </Button>
                            </div>
                        </div>
                        <div className={styles.status}>
                            <h5 className={styles.statusTitle}>статус donation alerts</h5>
                            <span className={styles.statusText}>Donation alerts подключен</span>
                            <div className={styles.statusButtons}>
                                <Button padding="big">
                                    <ButtonText>Отключить</ButtonText>
                                </Button>
                                <Button style="green" borderRadius="50%" width="50px" height="50px" alignment="center">
                                    <ButtonIcon margin="none">
                                        <StatusOk />
                                    </ButtonIcon>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.emotes}>
                    </div>
                </div>
            </div>
        </div>
    )
}
