import { LanguageSwitcher } from 'features/language-switcher'
import { ThemeSwitcher } from 'features/theme-switcher'
import { PageHeader } from 'shared/ui'

import { Logo } from '../logo/logo'
import { Streamers } from '../streamers/streamers'

import styles from './header.module.scss'

export const HeaderDesktop = () => {
    return (
        <PageHeader className={styles.header}>
            <Logo />
            <Streamers />
            <div className={styles.headerSettings}>
                <LanguageSwitcher />
                <ThemeSwitcher />
            </div>
        </PageHeader>
    )
}
