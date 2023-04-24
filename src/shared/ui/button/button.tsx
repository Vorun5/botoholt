import clsx from 'clsx'
import { ReactNode } from 'react'
import styles from './button.module.scss'

interface ButtonTextProps {
    children: string
    className?: string
}

export const ButtonText = ({ children, className }: ButtonTextProps) => {
    return <span className={clsx(styles.bthText, className && className)}>{children}</span>
}

interface ButtonIconProps {
    children: ReactNode
    margin?: 'left' | 'right' | 'none'
    className?: string
}

export const ButtonIcon = ({ children, margin = 'right', className }: ButtonIconProps) => {
    return (
        <span
            className={clsx(
                styles.bthIcon,
                margin === 'right' && styles.bthIconRight,
                margin === 'left' && styles.bthIconLeft,
                className && className,
            )}
        >
            {children}
        </span>
    )
}

interface ButtonProps {
    style?: 'default' | 'blue' | 'fill-blue' | 'green' | 'red' | 'fill-red' | 'transparent'
    alignment?: 'center' | 'left' | 'right'
    borderRadius?: string
    children: ReactNode
    onClick?: () => void
    height?: string
    width?: string
    padding?: 'big' | 'normal' | 'small'
    border?: boolean
    className?: string
}

export const Button = ({
    style = 'default',
    children,
    onClick,
    className,
    borderRadius,
    alignment = 'center',
    height,
    width,
    padding = 'normal',
    border = false,
}: ButtonProps) => {
    return (
        <button
            className={clsx(
                styles.bth,
                style === 'transparent' && styles.bthTransparent,
                style === 'fill-blue' && styles.bthFillBlue,
                style === 'blue' && styles.bthBlue,
                style === 'default' && styles.bthDefault,
                style === 'green' && styles.bthGreen,
                style === 'fill-red' && styles.bthFillRed,
                style === 'red' && styles.bthRed,
                padding === 'big' && styles.bthPaddingBig,
                padding === 'normal' && styles.bthPaddingNormal,
                padding === 'small' && styles.bthPaddingSmall,
                border && styles.bthBorder,
                className && className,
            )}
            type="button"
            onClick={onClick}
            style={{
                borderRadius: borderRadius,
                justifyContent: alignment,
                height: height,
                width: width,
            }}
        >
            {children}
        </button>
    )
}
