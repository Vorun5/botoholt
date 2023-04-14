import clsx from 'clsx'
import { ReactNode } from 'react'
import styles from './button.module.scss'

interface ButtonProps {
    style?: 'primary' | 'secondary'
    children: ReactNode
    onClick?: () => void
}

export const Button = ({ style = 'primary', children, onClick = () => {} }: ButtonProps) => {
    return (
        <button
            className={clsx(
                styles.bth,
                style === 'primary' && styles.bthPrimary,
                style === 'secondary' && styles.bthSecondary,
            )}
            type="button"
            onClick={() => onClick()}
        >
            {children}
        </button>
    )
}
