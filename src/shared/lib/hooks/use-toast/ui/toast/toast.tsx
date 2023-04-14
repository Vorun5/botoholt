import clsx from 'clsx'
import { ReactNode, useEffect } from 'react'
import { useToast } from '../../use-toast'
import styles from './toast.module.scss'

export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom'
export type ToastStatus = 'success' | 'error'

export type ToastProps = {
    id: number
    delayInSeconds?: number
    title?: string
    text?: string
    status?: ToastStatus
    position?: ToastPosition
    children?: ReactNode
}

export const Toast = ({ text, title, id, status = 'success', delayInSeconds, children }: ToastProps) => {
    const toastTools = useToast()

    useEffect(() => {
        const timer = setTimeout(
            () => {
                if (toastTools) {
                    toastTools.removeToast(id)
                }
            },
            delayInSeconds ? delayInSeconds * 1000 : 2000,
        )

        return () => {
            clearTimeout(timer)
        }
    }, [id, toastTools])

    return (
        <div className={clsx(styles.toast, status === 'error' && styles.toastError)}>
            {title && <h3 className={styles.toastTitle}>{title}</h3>}
            {children ? children : text}
        </div>
    )
}
