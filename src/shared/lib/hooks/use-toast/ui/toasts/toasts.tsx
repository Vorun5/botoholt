import clsx from 'clsx'
import { createPortal } from 'react-dom'

import { Toast, ToastProps } from '../toast/toast'

import styles from './toasts.module.scss'

export const Toasts = ({ toasts }: { toasts: ToastProps[] }) => {
    const topToasts = toasts.filter((toast) => toast.position === 'top' || toast.position === undefined)
    const topRightToasts = toasts.filter((toast) => toast.position === 'top-right')
    const topLeftToasts = toasts.filter((toast) => toast.position === 'top-left')
    const bottomLeftToasts = toasts.filter((toast) => toast.position === 'bottom-left').reverse()
    const bottomRightToasts = toasts.filter((toast) => toast.position === 'bottom-right').reverse()
    const bottomToasts = toasts.filter((toast) => toast.position === 'bottom').reverse()

    return createPortal(
        <div className={styles.toastsWrapper}>
            {
                <div className={clsx(styles.toasts, styles.toastsTop)}>
                    {topToasts.map((toast) => (
                        <Toast key={toast.id} {...toast} />
                    ))}
                </div>
            }
            {
                <div className={clsx(styles.toasts, styles.toastsBottom)}>
                    {bottomToasts.map((toast) => (
                        <Toast key={toast.id} {...toast} />
                    ))}
                </div>
            }
            {
                <div className={clsx(styles.toasts, styles.toastsTopRight)}>
                    {topRightToasts.map((toast) => (
                        <Toast key={toast.id} {...toast} />
                    ))}
                </div>
            }
            {
                <div className={clsx(styles.toasts, styles.toastsTopLeft)}>
                    {topLeftToasts.map((toast) => (
                        <Toast key={toast.id} {...toast} />
                    ))}
                </div>
            }
            {
                <div className={clsx(styles.toasts, styles.toastsBottomLeft)}>
                    {bottomLeftToasts.map((toast) => (
                        <Toast key={toast.id} {...toast} />
                    ))}
                </div>
            }
            {
                <div className={clsx(styles.toasts, styles.toastsBottomRight)}>
                    {bottomRightToasts.map((toast) => (
                        <Toast key={toast.id} {...toast} />
                    ))}
                </div>
            }
        </div>,
        document.body,
    )
}
