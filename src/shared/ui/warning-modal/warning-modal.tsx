import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, ButtonText } from '../button/button'
import { Modal } from '../modal/modal'

import styles from './warning-modal.module.scss'

interface WarningModalProps {
    dontSaveCallback?: () => void
    saveCallback?: () => void
    dontSaveCallbackLabel?: string
    saveCallbackLabel?: string
    dontSaveButton?: ReactNode
    saveButton?: ReactNode
    hide: () => void
    isShown: boolean
    title?: string
    emote?: string
    text?: string
}

export const WarningModal = ({
    saveCallback,
    dontSaveCallback,
    dontSaveCallbackLabel,
    saveCallbackLabel,
    hide,
    isShown,
    dontSaveButton,
    emote,
    saveButton,
    text,
    title,
}: WarningModalProps) => {
    const { t } = useTranslation()

    return (
        <Modal
            isShown={isShown}
            title={title}
            hide={hide}
            footerDivider
            hideScroll
            footerContent={
                <div className={styles.warningActions}>
                    {!saveButton ? (
                        <Button style="fill-blue" height="50px" onClick={saveCallback}>
                            <ButtonText>{saveCallbackLabel ? saveCallbackLabel : t('save-changes')}</ButtonText>
                        </Button>
                    ) : (
                        saveButton
                    )}
                    {!dontSaveButton ? (
                        <Button style="fill-red" onClick={dontSaveCallback}>
                            <ButtonText>{dontSaveCallbackLabel ? dontSaveCallbackLabel : t('exit')}</ButtonText>
                        </Button>
                    ) : (
                        dontSaveButton
                    )}
                </div>
            }
        >
            <div className={styles.warning}>
                {emote && <img src={emote} alt="" width={110} height={110} className={styles.warningEmote} />}
                {text && <span className={styles.warningText}>{text}</span>}
            </div>
        </Modal>
    )
}
