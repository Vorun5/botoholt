import { useEffect, useState } from 'react'

let modals = 0

export const useModal = (value?: boolean): [boolean, () => void, (value: boolean) => void] => {
    const [isShown, setIsShown] = useState(value ?? false)
    useEffect(() => {
        if (value) {
            document.body.classList.add('modal-show')
        }
    }, [])

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
        console.log(modals)
    }

    const toggle = () => {
        const newValue = !isShown
        setModal(newValue)
    }

    return [isShown, toggle, setModal]
}
