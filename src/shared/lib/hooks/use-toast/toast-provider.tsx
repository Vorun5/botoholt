import { nanoid } from 'nanoid'
import { createContext, ReactNode, useCallback, useState } from 'react'
import { ToastProps, ToastPosition, ToastStatus } from './ui'
import { Toasts } from './ui'

interface ToastContextType {
    addToast: (
        content: { title?: string; text?: string; children?: ReactNode },
        options?: { delayInSeconds?: number; status?: ToastStatus; position?: ToastPosition },
    ) => void
    removeToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextType | null>(null)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<ToastProps[]>([])

    const addToast = useCallback(
        (
            content: { title?: string; text?: string; children?: ReactNode },
            options?: { delayInSeconds?: number; status?: ToastStatus; position?: ToastPosition },
        ) => setToasts((toasts) => [...toasts, { id: nanoid(), ...content, ...options }]),
        [setToasts],
    )

    const removeToast = useCallback(
        (id: string) => setToasts((toasts) => toasts.filter((t) => t.id !== id)),
        [setToasts],
    )

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            <Toasts toasts={toasts} />
            {children}
        </ToastContext.Provider>
    )
}
