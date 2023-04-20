import clsx from 'clsx'
import { useEffect } from 'react'
import { ThemeSwitcher } from 'features/index'
import { NavigationBar } from '../navigation-bar/navigation-bar'
import styles from './admin-page.module.scss'

export const AdminPage = () => {
    useEffect(() => {
        window.document.title = 'Admin'
    }, [])

    return (
        <div className={styles.pageWrapper}>
            <NavigationBar />
            <div className={styles.pageContent}>
                <header className={clsx(styles.pageHeader, styles.header)}>
                    <h1 className={styles.headerTitle}>
                        <span>Приветствуем, </span>Smurf_tv!
                    </h1>
                    <div className={styles.headerSetting}>
                        <div className={styles.settingsThemeSwitcher}>
                            <ThemeSwitcher short />
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}
