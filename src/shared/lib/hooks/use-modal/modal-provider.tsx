import { createContext, ReactNode, useEffect, useState } from 'react'

interface ModalContextType {
    addModal: () => void
    removeModal: () => void
}

export const ModalContext = createContext<ModalContextType | null>(null)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modals, setModals] = useState(0)
    const addModal = () => {
        setModals(modals + 1)
    }

    const removeModal = () => {
        setModals(modals - 1)
    }

    useEffect(() => {
        if (modals < 0) {
            throw new Error('Number of modals cannot be less than 0')
        }
        if (modals > 0) {
            document.body.classList.add('modal-show')
        }
        if (modals === 0) {
            document.body.classList.remove('modal-show')
        }
    }, [modals])

    return <ModalContext.Provider value={{ addModal, removeModal }}>{children}</ModalContext.Provider>
}
