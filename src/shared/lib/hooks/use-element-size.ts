import { RefObject, useCallback, useEffect, useState } from 'react'

export const useElementSize = <T extends HTMLElement>(elementRef?: RefObject<T>) => {
    const [elementSize, setElementSize] = useState({
        width: 0,
        height: 0,
    })

    const listener = useCallback(() => {
        if (elementRef?.current) {
            setElementSize({
                width: elementRef.current.offsetWidth,
                height: elementRef.current.offsetHeight,
            })
        }
    }, [elementRef])

    useEffect(() => {
        listener()
        window.addEventListener('resize', listener)

        return () => window.removeEventListener('resize', listener)
    }, [])

    return elementSize
}
