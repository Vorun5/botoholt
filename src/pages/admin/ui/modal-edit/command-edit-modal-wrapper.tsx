import { ReactNode } from 'react'
import { Button, ButtonText, Modal } from 'shared/ui'
import styles from './modal-edit.module.scss'

interface CommandEditModalWrapperProps {
    hide: () => void
    saveChanges: () => void
    children?: ReactNode
}

export const CommandEditModalWrapper = ({ hide, saveChanges, children }: CommandEditModalWrapperProps) => {
    return (
        <Modal
            isShown
            hide={hide}
            title="Редактирование"
            footerDivider
            footerContent={
                <Button className={styles.footerBth} onClick={saveChanges} padding="big" style="fill-blue">
                    <ButtonText>Сохранить изменения</ButtonText>
                </Button>
            }
            headerDivider
            expandedWidth
        >
            {children}
        </Modal>
    )
}
