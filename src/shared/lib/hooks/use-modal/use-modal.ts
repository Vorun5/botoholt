import { useState } from 'react'

let modals = 0

export const useModal = (): [boolean, () => void, (value: boolean) => void] => {
    const [isShown, setIsShown] = useState(false)

    const setModal = (value: boolean) => {
        const newValue = value
        if (newValue) {
            ++modals
            setIsShown(true)
        } else {
            --modals
            setIsShown(false)
        }
        if (modals < 0) modals = 0
        if (modals > 0) document.body.classList.add('modal-show')
        if (modals === 0) document.body.classList.remove('modal-show')
    }

    const toggle = () => {
        const newValue = !isShown
        setModal(newValue)
    }

    return [isShown, toggle, setModal]
}
