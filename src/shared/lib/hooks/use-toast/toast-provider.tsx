import { createContext, ReactNode, useCallback, useState } from 'react'
import { ToastProps, ToastPosition, ToastStatus } from './ui'
import { Toasts } from './ui'

interface ToastContextType {
    addToast: (
        content: { title?: string; text?: string; children?: ReactNode },
        options?: { delayInSeconds?: number; status?: ToastStatus; position?: ToastPosition },
    ) => void
    removeToast: (id: number) => void
}

export const ToastContext = createContext<ToastContextType | null>(null)

let id = 1

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<ToastProps[]>([])

    const addToast = useCallback(
        (
            content: { title?: string; text?: string; children?: ReactNode },
            options?: { delayInSeconds?: number; status?: ToastStatus; position?: ToastPosition },
        ) => setToasts((toasts) => [...toasts, { id: id++, ...content, ...options }]),
        [setToasts],
    )

    const removeToast = useCallback(
        (id: number) => setToasts((toasts) => toasts.filter((t) => t.id !== id)),
        [setToasts],
    )

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            <Toasts toasts={toasts} />
            {children}
        </ToastContext.Provider>
    )
}
