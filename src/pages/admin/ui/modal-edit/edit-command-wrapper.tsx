import { ReactNode, useEffect, useState } from 'react'
import { useAdminCommandsMutation, useAdminCustomCommandsMutation } from 'entities/commands'
import D from 'shared/assets/emotes/D.png'
import { useModal, useToast } from 'shared/lib/hooks'
import { AllPossibleCommandType } from 'shared/types'
import { Button, ButtonText, Modal, WarningModal } from 'shared/ui'
import { useTranslation } from 'react-i18next'

import { CommandContentWrapper } from './command-content-wrapper'

import styles from './modal-edit.module.scss'
interface EditCommandWrapperProps {
    hide: () => void
    getNewCommand: () => null | AllPossibleCommandType
    children?: ReactNode
    commandName: string
    commandsType: 'default' | 'custom'
    variables: string[]
}

export const EditCommandWrapper = ({
    hide,
    getNewCommand,
    children,
    commandName,
    commandsType,
    variables,
}: EditCommandWrapperProps) => {
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

    const saveChanges = () => {
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

    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        if (isMounted) {
            if (isError) {
                changesNotSavedToast(error instanceof Error ? error.message : 'Unknown error')
            }
            if (isSuccess) {
                changesSavedToast()
            }
        } else {
            setIsMounted(true)
        }
    }, [isSuccess, isError])

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
                text={t('edit-commands.warning.text')!}
                title={t('edit-commands.warning.title') ?? 'Exit?'}
            />
            <Modal
                isShown
                dontHide={isLodaing || showWarning}
                hide={() => {
                    const newCommand = getNewCommand()
                    if (newCommand) {
                        toggleShowWarning()
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
                        onClick={saveChanges}
                        padding="big"
                        style="fill-blue"
                    >
                        <ButtonText>{t('save-changes')}</ButtonText>
                    </Button>
                }
                headerDivider={variables.length === 0}
                expandedWidth
            >
                <CommandContentWrapper variables={variables}>{children}</CommandContentWrapper>
            </Modal>
        </>
    )
}
