import { useContext } from 'react'
import { ToastContext } from './toast-provider'

export const useToast = () => {
    const toastHelpers = useContext(ToastContext)
    
    return toastHelpers
}
