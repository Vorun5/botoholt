import { Modal } from 'shared/ui'

interface AddCustomCommadProps {
    isShown: boolean
    hide: () => void
}

export const AddCustomCommand = ({ isShown, hide }: AddCustomCommadProps) => {
    return <Modal isShown={isShown} hide={hide}></Modal>
}
