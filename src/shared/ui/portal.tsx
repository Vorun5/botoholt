import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export const Portal = ({ children }: { children: ReactNode }) => {
    const [container] = useState(() => document.createElement('div'))

    useEffect(() => {
        document.body.appendChild(container)

        return () => {
            document.body.removeChild(container)
        }
    }, [container])

    return createPortal(children, container)
}
