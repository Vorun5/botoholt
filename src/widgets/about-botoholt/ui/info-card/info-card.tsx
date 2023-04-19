import clsx from 'clsx'
import { ReactNode } from 'react'
import styles from './info-card.module.scss'

interface InfoCardProps {
    title: string
    children: ReactNode
    icon: ReactNode
    mobile?: boolean
}

export const InfoCard = ({ icon, title, children, mobile = false }: InfoCardProps) => {
    return (
        <div className={clsx(styles.card, mobile && styles.cardMobile)}>
            {icon}
            <h1 className={styles.cardTitle}>{title}</h1>
            <div className={styles.abs} />
            <div className={styles.cardContent}>{children}</div>
        </div>
    )
}
