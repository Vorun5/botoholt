import { useState } from 'react';

export const useModal = (): [boolean, () => void] => {
    const [isShown, setIsShown] = useState(false)

    const toggle = () => setIsShown(!isShown)

    return [isShown, toggle]
}
