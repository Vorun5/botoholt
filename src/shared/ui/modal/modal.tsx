import clsx from 'clsx'
import { ReactNode, useRef } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from 'shared/assets/icons'
import { useOnClickOutside } from 'shared/lib/hooks'
import { Button, ButtonIcon } from 'shared/ui'
import styles from './modal.module.scss'

interface ModalHeaderProps {
    children: ReactNode
    hide: () => void
}

export const ModalHeader = ({ children, hide }: ModalHeaderProps) => {
    return (
        <div className={styles.header}>
            <h1 className={styles.headerTitle}>{children}</h1>
            <Button width="46px" height="46px" borderRadius="50%" onClick={hide}>
                <ButtonIcon margin="none">
                    <CloseIcon width="22px" height="22px" />
                </ButtonIcon>
            </Button>
        </div>
    )
}

export const ModalDivider = () => {
    return <div className={styles.divider} />
}

interface ModalFooterProps {
    children: ReactNode
}

export const ModalFooter = ({ children }: ModalFooterProps) => {
    return <div className={styles.footer}>{children}</div>
}

interface ModalProps {
    isShown: boolean
    hide: () => void
    padding?: boolean
    children: ReactNode
}

export const Modal = ({ children, isShown, hide, padding = true }: ModalProps) => {
    const ref = useRef(null)
    useOnClickOutside(ref, hide)

    const modal = (
        <div className={clsx(styles.background, !open && styles.close)}>
            <div ref={ref} className={clsx(styles.wrapper, padding && styles.wrapperPadding)}>
                {children}
            </div>
        </div>
    )

    isShown ? document.body.classList.add('modal-show') : document.body.classList.remove('modal-show')

    return isShown ? createPortal(modal, document.body) : <></>
}
