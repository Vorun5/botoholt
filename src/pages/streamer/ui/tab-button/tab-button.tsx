import clsx from 'clsx'
import styles from './tab-button.module.scss'

interface TabButtonProps {
    onClick?: () => void
    children: string
    active?: boolean
}

export const TabButton = ({ children, onClick = () => {}, active }: TabButtonProps) => {
    return (
        <button type="button" onClick={() => onClick()} className={clsx(styles.button, active && styles.buttonActive)}>
            {children}
        </button>
    )
}
