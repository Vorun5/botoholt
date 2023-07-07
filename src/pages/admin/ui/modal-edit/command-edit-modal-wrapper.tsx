import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonText, Modal } from 'shared/ui'
import styles from './modal-edit.module.scss'

interface CommandEditModalWrapperProps {
    hide: () => void
    saveChanges: () => void
    children?: ReactNode
}

export const CommandEditModalWrapper = ({ hide, saveChanges, children }: CommandEditModalWrapperProps) => {
    const { t } = useTranslation()

    return (
        <Modal
            isShown
            hide={hide}
            title={t('edit-commands.title') ?? 'Editing'}
            footerDivider
            footerContent={
                <Button className={styles.footerBth} onClick={saveChanges} padding="big" style="fill-blue">
                    <ButtonText>{t('save-changes')}</ButtonText>
                </Button>
            }
            headerDivider
            expandedWidth
        >
            {children}
        </Modal>
    )
}
