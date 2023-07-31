import { ReactNode } from 'react'
import clsx from 'clsx'

import styles from './banner.module.scss'

interface BannerProps {
    className?: string
    style?: 'primary' | 'secondary'
    children?: ReactNode
}

export const Banner = ({ style = 'primary', children, className }: BannerProps) => {
    return (
        <div
            className={clsx(
                styles.banner,
                style === 'primary' && styles.bannerPrimary,
                style === 'secondary' && styles.bannerSecondary,
                className,
            )}
        >
            {children}
        </div>
    )
}
