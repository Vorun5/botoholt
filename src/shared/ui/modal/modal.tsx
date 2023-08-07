import { ReactNode, useEffect, useRef } from 'react'
import { CloseIcon } from 'shared/assets/icons'
import { useOnClickOutside } from 'shared/lib/hooks'
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
}: ModalProps) => {
    const ref = useRef(null)
    const onHide = () => {
        if (dontHide) return
        document.body.classList.remove('modal-show')
        hide()
    }

    useOnClickOutside(ref, onHide)

    useEffect(() => {
        if (isShown) {
            document.body.classList.add('modal-show')
        } else {
            document.body.classList.remove('modal-show')
        }
    }, [isShown])

    const contentHeight = `calc(100vh - 40px - 20px - 72px - ${title ? '100px' : '0px'} - ${
        footerContent ? '80px' : '0px'
    } - ${headerDivider ? '30px' : '0px'}`

    if (!isShown) return <></>

    return (
        <Portal>
            <div
                className={clsx(styles.background, !open && styles.close)}
                style={{
                    position: 'absolute',
                    top: `${window.scrollY}px`,
                }}
            >
                <div ref={ref} className={clsx(styles.wrapper, expandedWidth && styles.wrapperExpandedWidth)}>
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
