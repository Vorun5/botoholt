import clsx from 'clsx'
import { ReactNode } from 'react'
import { CloseIcon } from 'shared/assets/icons'
import { Button } from 'shared/ui'
import styles from './modal.module.scss'

interface ModalHeaderProps {
    children: ReactNode
    onChange: () => void
}

export const ModalHeader = ({ children, onChange }: ModalHeaderProps) => {
    return (
        <div className={styles.header}>
            <h1 className={styles.headerTitle}>{children}</h1>
            <Button width="46px" height="46px" borderRadius="50%" onClick={onChange}>
                <CloseIcon />
            </Button>
        </div>
    )
}

export const ModalFooter = () => {
    return <div className={styles.footer}></div>
}

interface ModalProps {
    open: boolean
    children: ReactNode
}

export const Modal = ({ children, open }: ModalProps) => {
    return (
        <div className={clsx(styles.background, !open && styles.close)}>
            <div className={styles.wrapper}>{children}</div>
        </div>
    )
}
