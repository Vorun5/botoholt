import { useRef } from 'react'
import { LanguageSwitcher } from 'features/language-switcher'
import { ThemeSwitcher } from 'features/theme-switcher'
import { useModalSwitch } from 'shared/lib/hooks'
import { CreatedWithLove, PageHeader } from 'shared/ui'
import clsx from 'clsx'

import { Burger } from '../burger/burger'
import { Logo } from '../logo/logo'

import styles from './header.module.scss'


export const HeaderMobile = () => {
    const settingsRef = useRef(null)
    const [settingsOpen, onClick] = useModalSwitch(settingsRef)

    return (
        <PageHeader className={styles.headerWrapper}>
            <div className={styles.header}>
                <Burger onClick={onClick} isOpen={settingsOpen} />
                <Logo />
                <div />
            </div>
            <div ref={settingsRef} className={clsx(styles.headerSettings, settingsOpen && styles.headerSettingsOpen)}>
                <LanguageSwitcher />
                <ThemeSwitcher />
                <CreatedWithLove />
            </div>
        </PageHeader>
    )
}
