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

    if (delayInSeconds) {
        useEffect(() => {
            const timer = setTimeout(() => {
                if (toastTools) {
                    toastTools.removeToast(id)
                }
            }, delayInSeconds * 1000)

            return () => {
                clearTimeout(timer)
            }
        }, [id, toastTools])
    }

    return (
        <div className={clsx(styles.toast, status === 'error' && styles.toastError)}>
            {(title || !delayInSeconds) && (
                <div className={styles.toastHeader}>
                    <h3 className={styles.toastTitle}>{title}</h3>
                    {!delayInSeconds && (
                        <button
                            type="button"
                            className={styles.toastClose}
                            onClick={() => {
                                if (toastTools) toastTools.removeToast(id)
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 13.189L13.189 5.76511e-07L13.9999 0.810962L0.810959 14L0 13.189Z" />
                                <path d="M0.811012 0L14 13.189L13.189 14L5.2464e-05 0.810961L0.811012 0Z" />
                            </svg>
                        </button>
                    )}
                </div>
            )}
            {children ? children : text}
        </div>
    )
}
