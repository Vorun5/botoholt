import styles from './Header.module.css'
import clsx from 'clsx'
import Bloc from 'components/Bloc/Bloc'
import CreateWith from 'components/CreateWith/CreateWith'
import ToggleLanguage from 'components/ToggleLanguage/ToggleLanguage'
import ToggleTheme from 'components/ToggleTheme/ToggleTheme'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const HeaderMobile = () => {
    const [settingsOpen, setSettingsOpen] = useState(false)

    return (
        <>
            <div className={styles.container}>
                <div
                    className={clsx(styles.burger, settingsOpen && styles.burger__open)}
                    onClick={() => {
                        if (settingsOpen) {
                            setSettingsOpen(false)
                            document.body.classList.remove('modal-show')
                            return
                        }
                        setSettingsOpen(true)
                        document.body.classList.add('modal-show')
                        window.scrollTo(0, 0)
                    }}
                >
                    <div />
                    <div />
                    <div />
                </div>
                <Link className={styles.logo} to='/'>
                    <img src='/images/Logo.svg' alt='logo' />
                </Link>
                <div className={styles.empty}></div>
            </div>
            <div className={clsx(styles.menu, settingsOpen && styles.menu__open)}>
                <div className={styles.menu_container}>
                    <div className={styles.menu_bth}>
                        <ToggleTheme />
                    </div>
                </div>
                <Bloc height='16px' />
                <div className={styles.menu_bth}>
                    <ToggleLanguage />
                </div>
                <Bloc height='16px' />
                <CreateWith />
            </div>
        </>
    )
}

export default HeaderMobile
