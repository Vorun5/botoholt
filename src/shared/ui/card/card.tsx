import clsx from 'clsx'
import { ReactNode } from 'react'
import styles from './card.module.scss'

type Style = 'default' | 'green' | 'blue' | 'orange'

interface CardDescriptionProps {
    style?: 'default' | 'green' | 'blue' | 'orange' | 'red'
    children: ReactNode
    className?: string
}

export const CardDescription = ({ style = 'default', children, className }: CardDescriptionProps) => {
    return (
        <h3
            className={clsx(
                styles.cardDescription,
                style === 'green' && styles.cardDescriptionGreen,
                style === 'orange' && styles.cardDescriptionOrange,
                style === 'blue' && styles.cardDescriptionBlue,
                style === 'red' && styles.cardDescriptionRed,
                className,
            )}
        >
            {children}
        </h3>
    )
}

interface CardTitleProps {
    style?: Style
    children: ReactNode
    className?: string
}

export const CardTitle = ({ style = 'default', children, className }: CardTitleProps) => {
    return (
        <h4
            className={clsx(
                styles.cardTitle,
                style === 'green' && styles.cardTitleGreen,
                style === 'orange' && styles.cardTitleOrange,
                style === 'blue' && styles.cardTitleBlue,
                className,
            )}
        >
            {children}
        </h4>
    )
}

interface CardProps {
    padding?: 'normal' | 'none'
    borderRadius?: string
    children?: ReactNode
    height?: string
    width?: string
    style?: 'default' | 'green' | 'blue' | 'orange'
    className?: string
}

export const Card = ({
    padding = 'normal',
    style = 'default',
    borderRadius,
    children,
    className,
    width,
    height,
}: CardProps) => {
    return (
        <div
            className={clsx(
                styles.card,
                style === 'green' && styles.cardGreen,
                style === 'orange' && styles.cardOrange,
                style === 'blue' && styles.cardBlue,
                padding === 'normal' && styles.cardPaddingNormal,
                className,
            )}
            style={{ borderRadius: borderRadius, height: height, width: width }}
        >
            {children}
        </div>
    )
}
