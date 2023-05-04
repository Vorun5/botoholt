import clsx from 'clsx'
import { ReactNode } from 'react'
import styles from './card.module.scss'

type Style = 'default' | 'green' | 'blue' | 'orange'

interface CardDescriptionProps {
    style?: 'default' | 'green' | 'blue' | 'orange' | 'red'
    children: ReactNode
    textTransform?: 'none' | 'uppercase'
    className?: string
}

export const CardDescription = ({
    style = 'default',
    textTransform = 'uppercase',
    children,
    className,
}: CardDescriptionProps) => (
    <h3
        className={clsx(
            styles.cardDescription,
            style === 'green' && styles.cardDescriptionGreen,
            style === 'orange' && styles.cardDescriptionOrange,
            style === 'blue' && styles.cardDescriptionBlue,
            style === 'red' && styles.cardDescriptionRed,
            className,
        )}
        style={{
            textTransform: textTransform,
        }}
    >
        {children}
    </h3>
)

interface CardTitleProps {
    style?: Style
    children?: ReactNode
    className?: string
}

export const CardTitle = ({ style = 'default', children, className }: CardTitleProps) => (
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

export const CardDivider = () => <div className={styles.cardDivider} />

export const CardExpanded = ({ children }: { children?: ReactNode }) => (
    <div className={styles.cardExpanded}>{children}</div>
)

interface CardFooterProps {
    className?: string
    children?: ReactNode
}

export const CardFooter = ({ children, className }: CardFooterProps) => (
    <div className={clsx(styles.cardFooter, className)}>{children}</div>
)

interface CardProps {
    padding?: 'normal' | 'big' | 'none' | 'small'
    borderRadius?: string
    children?: ReactNode
    height?: string
    width?: string
    style?: 'default' | 'green' | 'blue' | 'orange' | 'red'
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
}: CardProps) => (
    <div
        className={clsx(
            styles.card,
            style === 'green' && styles.cardGreen,
            style === 'orange' && styles.cardOrange,
            style === 'blue' && styles.cardBlue,
            style === 'red' && styles.cardRed,
            padding === 'normal' && styles.cardPaddingNormal,
            padding === 'big' && styles.cardPaddingBig,
            padding === 'small' && styles.cardPaddingSmall,
            className,
        )}
        style={{ borderRadius: borderRadius, height: height, width: width }}
    >
        {children}
    </div>
)
