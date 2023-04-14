import { MutableRefObject, useState } from 'react'
import { useOnClickOutside } from './use-on-click-outside'

export const useModalSwitch = (
    ref: MutableRefObject<null>,
    beforeClickOoButton?: () => void,
    beforeClickOnModal?: () => void,
): [boolean, () => void] => {
    const [isOpen, setIsOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const delayInSecond = 0.5

    const clickOnButton = () => {
        if (beforeClickOoButton) beforeClickOoButton()
        if (modalOpen) return
        setIsOpen(true)
        setModalOpen(true)
    }

    const clickOnModal = () => {
        if (!isOpen) return
        if (beforeClickOnModal) beforeClickOnModal()
        setIsOpen(false)
        const timerId = window.setTimeout(() => {
            setModalOpen(false)
        }, delayInSecond * 1000)
    }

    useOnClickOutside(ref, clickOnModal)

    return [isOpen, clickOnButton]
}
