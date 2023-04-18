import { useEffect } from 'react'

// Interval = 15 seconds
export const useInterval = (update: () => void) => {
    useEffect(() => {
        const timerID = setInterval(() => {
            update()
        }, 15000)
        return () => clearInterval(timerID)
    }, [update])
}
