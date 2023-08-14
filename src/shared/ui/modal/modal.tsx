import { ReactNode } from 'react'
import { CloseIcon } from 'shared/assets/icons'
import { Button, ButtonIcon } from 'shared/ui'
import clsx from 'clsx'

import { Portal } from '../portal'

import styles from './modal.module.scss'

interface ModalProps {
    isShown: boolean
    hide: () => void
    className?: string
    headerDivider?: boolean
    footerDivider?: boolean
    title?: string
    footerContent?: ReactNode
    hideScroll?: boolean
    expandedWidth?: boolean
    dontHide?: boolean
    children?: ReactNode
    contentWithoutPadding?: boolean
}

export const Modal = ({
    children,
    isShown,
    hide,
    footerDivider = false,
    headerDivider = false,
    footerContent,
    title,
    className,
    hideScroll = false,
    expandedWidth = false,
    dontHide = false,
    contentWithoutPadding = false,
}: ModalProps) => {
    const onHide = () => {
        if (dontHide) return
        hide()
    }

    const contentHeight = `calc(100vh - 40px - 20px - 72px - ${title ? '100px' : '0px'} - ${
        footerContent ? '80px' : '0px'
    } - ${headerDivider ? '30px' : '0px'}`

    if (!isShown) return <></>

    return (
        <Portal>
            <div className={styles.container}>
                <div className={clsx(styles.background, !open && styles.close)} onClick={onHide} />
                <div
                    className={clsx(styles.modal, expandedWidth && styles.modalExpandedWidth)}
                    style={{
                        padding: contentWithoutPadding
                            ? '0 0 var(--bh-container-modal-padding) 0'
                            : 'var(--bh-container-modal-padding) 0',
                    }}
                >
                    {title && (
                        <>
                            <div className={styles.header}>
                                <h1 className={styles.headerTitle}>{title}</h1>
                                <Button width="46px" height="46px" borderRadius="50%" onClick={onHide}>
                                    <ButtonIcon margin="none">
                                        <CloseIcon width="22px" height="22px" />
                                    </ButtonIcon>
                                </Button>
                            </div>
                            {headerDivider && <div className={styles.headerDivider} />}
                        </>
                    )}
                    <div
                        className={clsx(styles.content, hideScroll && styles.contentHideScroll, className)}
                        style={{
                            maxHeight: contentHeight,
                            padding: contentWithoutPadding ? '0' : '0 var(--bh-container-modal-padding)',
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
        </Portal>
    )
}
