import clsx from 'clsx'
import { ReactNode } from 'react'
import LoadingGif from 'shared/assets/emotes/FeelsLoadingMan.gif'
import styles from './button.module.scss'

interface ButtonTextProps {
    children: string
    className?: string
}

export const ButtonText = ({ children, className }: ButtonTextProps) => {
    return <span className={clsx(styles.bthText, className)}>{children}</span>
}

interface ButtonIconProps {
    children?: ReactNode
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
                className,
            )}
        >
            {children}
        </span>
    )
}

interface ButtonProps {
    style?: 'default' | 'blue' | 'fill-blue' | 'green' | 'red' | 'fill-red' | 'orange' |  'transparent'
    alignment?: 'center' | 'left' | 'right'
    borderRadius?: string
    children?: ReactNode
    onClick?: () => void
    height?: string
    width?: string
    padding?: 'big' | 'normal' | 'small'
    border?: boolean
    loading?: boolean
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
    loading = false,
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
                style === 'orange' && styles.bthOrange,
                padding === 'big' && styles.bthPaddingBig,
                padding === 'normal' && styles.bthPaddingNormal,
                padding === 'small' && styles.bthPaddingSmall,
                border && styles.bthBorder,
                className,
            )}
            type="button"
            onClick={loading ? undefined : onClick}
            style={{
                borderRadius: borderRadius,
                justifyContent: alignment,
                height: height,
                width: width,
            }}
        >
            {loading ? (
                <ButtonIcon margin="none">
                    <img width={30} height={30} src={LoadingGif} alt="loading" />
                </ButtonIcon>
            ) : (
                children
            )}
        </button>
    )
}
