import { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { changeCommand, selectCommandСhange } from 'entities/commands'
import D from 'shared/assets/emotes/D.png'
import { useToast } from 'shared/lib/hooks'
import { useAppDispatch } from 'shared/lib/store'
import { AllPossibleCommandType } from 'shared/types'
import { Button, ButtonText, Modal } from 'shared/ui'
import styles from './modal-edit.module.scss'
interface CommandEditModalWrapperProps {
    hide: () => void
    getNewCommand: () => null | AllPossibleCommandType
    children?: ReactNode
    commandName: string
}

export const CommandEditModalWrapper = ({
    hide,
    getNewCommand,
    children,
    commandName,
}: CommandEditModalWrapperProps) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    const toast = useToast()
    const [loadingChanges, setLoadingChanges] = useState(false)
    const commandChanges = useSelector(selectCommandСhange)

    const changesSavedToast = () => {
        if (toast)
            toast.addToast(
                {
                    text: t('edit-commands.command-cahnged', { commandName }) ?? 'Successful change',
                },
                { status: 'success', position: 'top-right', delayInSeconds: 3 },
            )
    }

    const changesNotSavedToast = (error: string) => {
        if (toast)
            toast.addToast(
                {
                    text: t('edit-commands.failed-command-changed', { commandName, error }) ?? 'Failed to change',
                },
                { status: 'error', position: 'top-right', delayInSeconds: 3 },
            )
    }

    const onClick = () => {
        const newCommand = getNewCommand()
        if (!newCommand) {
            if (toast)
                toast.addToast({ text: t('no-change') ?? 'No change' }, { position: 'top-right', delayInSeconds: 3 })
            return
        }
        dispatch(changeCommand(newCommand))
    }

    const localHide = () => {
        hide()
        document.body.classList.remove('modal-show')
    }

    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        if (isMounted) {
            setLoadingChanges(commandChanges.status === 'loading')
            if (commandChanges.status === 'rejected') changesNotSavedToast(commandChanges.error ?? '')
            if (commandChanges.status === 'received') {
                changesSavedToast()
                localHide()
            }
        } else {
            setIsMounted(true)
        }
    }, [commandChanges])

    const [showWarning, setShowWarning] = useState(false)

    return (
        <>
            <Modal
                isShown={showWarning}
                title={t('edit-commands.warning.title') ?? 'Exit?'}
                hide={() => setShowWarning(false)}
                footerDivider
                headerDivider
                footerContent={
                    <div className={styles.warningActions}>
                        <Button style="green" height="50px" onClick={() => setShowWarning(false)}>
                            <ButtonText>{t('cancel')}</ButtonText>
                        </Button>
                        <Button style="red" onClick={localHide}>
                            <ButtonText>{t('exit')}</ButtonText>
                        </Button>
                    </div>
                }
            >
                <div className={styles.warning}>
                    <img src={D} alt="" width={112} height={112} className={styles.warningEmote} />
                    <span className={styles.warningText}>{t('edit-commands.warning.text')}</span>
                </div>
            </Modal>
            <Modal
                isShown
                dontHide={loadingChanges || showWarning}
                hide={() => {
                    const newCommand = getNewCommand()
                    if (newCommand) {
                        setShowWarning(true)
                        return
                    }
                    hide()
                }}
                title={t('edit-commands.title') ?? 'Editing'}
                footerDivider
                footerContent={
                    <Button
                        loading={loadingChanges}
                        className={styles.footerBth}
                        onClick={onClick}
                        padding="big"
                        style="fill-blue"
                    >
                        <ButtonText>{t('save-changes')}</ButtonText>
                    </Button>
                }
                headerDivider
                expandedWidth
            >
                {children}
            </Modal>
        </>
    )
}
