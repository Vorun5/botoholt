import { CSSProperties, ReactNode } from 'react'
import clsx from 'clsx'

import styles from './page-layout.module.scss'

interface Props {
    className?: string
    children: ReactNode
    style?: CSSProperties
}

export const Page = ({ children, className, style }: Props) => {
    return (
        <div className={clsx(styles.page, className)} style={style}>
            {children}
        </div>
    )
}

export const PageHeader = ({ children, className, style }: Props) => {
    return (
        <header className={clsx(styles.pageHeader, className)} style={style}>
            {children}
        </header>
    )
}

export const PageContent = ({ children, className, style }: Props) => {
    return (
        <div className={clsx(styles.pageContent, className)} style={style}>
            {children}
        </div>
    )
}

export const PageContentExpanded = ({ children, className, style }: Props) => {
    return (
        <div className={clsx(styles.pageContentExpanded, className)} style={style}>
            {children}
        </div>
    )
}

export const PageFooter = ({ children, className, style }: Props) => {
    return (
        <footer className={(styles.pageFooter, className)} style={styles}>
            {children}
        </footer>
    )
}
