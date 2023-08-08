import { ReactNode, useEffect, useState } from 'react'
import { useAdminCommandsMutation, useAdminCustomCommandsMutation } from 'entities/commands'
import D from 'shared/assets/emotes/D.png'
import { useToast } from 'shared/lib/hooks'
import { AllPossibleCommandType } from 'shared/types'
import { Button, ButtonText, Modal } from 'shared/ui'
import { useTranslation } from 'react-i18next'

import styles from './modal-edit.module.scss'
interface CommandEditModalWrapperProps {
    hide: () => void
    getNewCommand: () => null | AllPossibleCommandType
    children?: ReactNode
    commandName: string
    commandsType: 'default' | 'custom'
}

export const CommandEditModalWrapper = ({
    hide,
    getNewCommand,
    children,
    commandName,
    commandsType,
}: CommandEditModalWrapperProps) => {
    const { t } = useTranslation()
    const toast = useToast()
    const {
        mutate: changeDefaultCommand,
        isLoading: isDefaultLoading,
        isSuccess: isDefaultSuccess,
        isError: isDefaultError,
        error: defaultError,
    } = useAdminCommandsMutation()
    const {
        mutate: changeCustomCommand,
        isLoading: isCustomLoading,
        isSuccess: isCustomSuccess,
        isError: isCustomError,
        error: customError,
    } = useAdminCustomCommandsMutation()

    const isLodaing = commandsType === 'custom' ? isCustomLoading : isDefaultLoading
    const isError = commandsType === 'custom' ? isCustomError : isDefaultError
    const isSuccess = commandsType === 'custom' ? isCustomSuccess : isDefaultSuccess
    const error = commandsType === 'custom' ? customError : defaultError

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
        if (commandsType === 'default') {
            changeDefaultCommand(newCommand)
        }
        if (commandsType === 'custom') {
            changeCustomCommand(newCommand)
        }
    }

    const localHide = () => {
        hide()
        document.body.classList.remove('modal-show')
    }

    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        if (isMounted) {
            if (isError) changesNotSavedToast(error instanceof Error ? error.message : 'Unknown error')
            if (isSuccess) {
                changesSavedToast()
                localHide()
            }
        } else {
            setIsMounted(true)
        }
    }, [isSuccess, isError])

    const [showWarning, setShowWarning] = useState(false)

    return (
        <>
            <Modal
                isShown={showWarning}
                title={t('edit-commands.warning.title') ?? 'Exit?'}
                hide={() => setShowWarning(false)}
                footerDivider
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
                dontHide={isLodaing || showWarning}
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
                        loading={isDefaultLoading}
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
