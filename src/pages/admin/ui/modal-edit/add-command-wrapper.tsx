import { ReactNode, useEffect, useState } from 'react'
import { useAdminCustomCommandsAddMutation } from 'entities/commands'
import D from 'shared/assets/emotes/D.png'
import { useModal, useToast } from 'shared/lib/hooks'
import { AllPossibleCustomCommandType } from 'shared/types'
import { Button, ButtonText, Modal, WarningModal } from 'shared/ui'
import { useTranslation } from 'react-i18next'

import styles from './modal-edit.module.scss'
interface AddCommandWrapper {
    hide: () => void
    getNewCommand: () => null | AllPossibleCustomCommandType
    children?: ReactNode
    commandName: string
}

export const AddCommandWrapper = ({ hide, getNewCommand, children, commandName }: AddCommandWrapper) => {
    const { t } = useTranslation()
    const [_, toggleModal, setModal] = useModal()
    useEffect(() => {
        setModal(true)

        return () => {
            setModal(false)
        }
    }, [])
    const toast = useToast()
    const {
        mutate: addCommand,
        isLoading: isAddCommandLoading,
        isSuccess: isAddCommandSuccess,
        isError: isAddCommandError,
        error: addCommandError,
    } = useAdminCustomCommandsAddMutation()

    const changesSavedToast = () => {
        if (toast)
            toast.addToast(
                {
                    text: t('add-command.command-saved', { commandName }) ?? 'Successful saved',
                },
                { status: 'success', position: 'top-right', delayInSeconds: 3 },
            )
        hide()
    }

    const changesNotSavedToast = (error: string) => {
        if (toast)
            toast.addToast(
                {
                    text: t('add-command.failed-command-saved', { commandName, error }) ?? 'Failed to saved',
                },
                { status: 'error', position: 'top-right', delayInSeconds: 3 },
            )
    }

    const saveChanges = () => {
        const newCommand = getNewCommand()
        if (!newCommand) {
            if (toast)
                toast.addToast({ text: t('no-change') ?? 'No change' }, { position: 'top-right', delayInSeconds: 3 })
            return
        }
        if (newCommand.aliases.length === 0) {
            if (toast)
                toast.addToast(
                    { text: t('edit-commands.empty-command-list') ?? 'No change' },
                    { position: 'top-right', delayInSeconds: 3, status: 'error' },
                )
            return
        }
        addCommand(newCommand)
    }

    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        if (isMounted) {
            if (isAddCommandError) {
                changesNotSavedToast(addCommandError instanceof Error ? addCommandError.message : 'Unknown error')
            }
            if (isAddCommandSuccess) {
                changesSavedToast()
            }
        } else {
            setIsMounted(true)
        }
    }, [isAddCommandSuccess, isAddCommandError])

    const [showWarning, toggleShowWarning] = useModal()

    return (
        <>
            <WarningModal
                hide={toggleShowWarning}
                isShown={showWarning}
                emote={D}
                dontSaveCallback={() => {
                    toggleShowWarning()
                    toggleModal()
                    hide()
                }}
                saveCallback={() => {
                    toggleShowWarning()
                    saveChanges()
                }}
                saveCallbackLabel={t('add-command.save-command') ?? 'Save command'}
                text={t('add-command.warning.text', { commandName })!}
                title={t('add-command.warning.title') ?? 'Exit?'}
            />
            <Modal
                isShown
                dontHide={isAddCommandLoading || showWarning}
                hide={() => {
                    const newCommand = getNewCommand()
                    if (newCommand) {
                        toggleShowWarning()
                        return
                    }
                    hide()
                }}
                title={t('add-command.title', { commandName }) ?? 'Adding new command'}
                footerDivider
                footerContent={
                    <Button
                        loading={isAddCommandLoading}
                        onClick={saveChanges}
                        padding="big"
                        style="fill-blue"
                        className={styles.footerBth}
                    >
                        <ButtonText>{t('add-command.save-command')}</ButtonText>
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
