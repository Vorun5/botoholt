import clsx from 'clsx'
import { ReactNode } from 'react'
import { ThemeSwitcher } from 'features'
import { useMediaQuery } from 'shared/lib/hooks'
import styles from './admin-layout.module.scss'

interface ALProps {
    children: ReactNode
    className?: string
}

export const ALPageWrapper = ({ children }: ALProps) => {
    return <div className={styles.wrapper}>{children}</div>
}

interface ALPageProps extends ALProps {
    background?: string
}

export const ALPage = ({ children, background }: ALPageProps) => {
    return (
        <div className={styles.page}>
            <div className={clsx(styles.pageBackground, background)} />
            {children}
        </div>
    )
}

export const ALPageContent = ({ children, className }: ALProps) => {
    return <div className={clsx(styles.pageContent, className)}>{children}</div>
}

interface ALHeaderProps extends ALProps {
    description?: string
}

export const ALPageHeader = ({ description, children }: ALHeaderProps) => {
    const isDesktop = useMediaQuery('(min-width: 1100px)')

    return (
        <header className={styles.header}>
            <div>
                <h1 className={styles.headerTitle}>{children}</h1>
                {description && <span className={styles.headerDescription}>{description}</span>}
            </div>
            {isDesktop && (
                <div className={styles.headerSetting}>
                    <div className={styles.headerSettingsTheme}>
                        <ThemeSwitcher short />
                    </div>
                </div>
            )}
        </header>
    )
}
