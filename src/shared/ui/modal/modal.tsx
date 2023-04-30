import clsx from 'clsx'
import { ReactNode, useRef } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from 'shared/assets/icons'
import { useOnClickOutside } from 'shared/lib/hooks'
import { Button, ButtonIcon } from 'shared/ui'
import styles from './modal.module.scss'

interface ModalProps {
    isShown: boolean
    hide: () => void
    className?: string
    footerDivider?: boolean
    title?: string
    footerContent?: ReactNode
    hideScroll?: boolean
    children: ReactNode
}

export const Modal = ({
    children,
    isShown,
    hide,
    footerDivider = false,
    footerContent,
    title,
    className,
    hideScroll = false,
}: ModalProps) => {
    const ref = useRef(null)
    useOnClickOutside(ref, hide)

    const contentHeight = `calc(100vh - 40px - 20px - 72px - ${title ? '120px' : '0px'} - ${
        footerContent ? '100px' : '0px'
    }`

    const modal = (
        <div
            className={clsx(styles.background, !open && styles.close)}
            style={{
                position: 'absolute',
                top: `${window.scrollY}px`,
            }}
        >
            <div ref={ref} className={clsx(styles.wrapper, className)}>
                {title && (
                    <div className={styles.header}>
                        <h1 className={styles.headerTitle}>{title}</h1>
                        <Button width="46px" height="46px" borderRadius="50%" onClick={hide}>
                            <ButtonIcon margin="none">
                                <CloseIcon width="22px" height="22px" />
                            </ButtonIcon>
                        </Button>
                    </div>
                )}
                <div
                    className={clsx(styles.content, hideScroll && styles.contentHideScroll)}
                    style={{
                        maxHeight: contentHeight,
                    }}
                >
                    {children}
                </div>
                {footerContent && (
                    <div className={styles.footer}>
                        {footerDivider && <div className={styles.footerDivider} />}
                        {footerContent}
                    </div>
                )}
            </div>
        </div>
    )

    isShown ? document.body.classList.add('modal-show') : document.body.classList.remove('modal-show')

    return isShown ? createPortal(modal, document.body) : <></>
}
