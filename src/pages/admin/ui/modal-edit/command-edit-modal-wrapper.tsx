import { ReactNode, useEffect, useState } from 'react'
import { useAdminCommandsMutation, useAdminCustomCommandsMutation } from 'entities/commands'
import D from 'shared/assets/emotes/D.png'
import { useModal, useToast } from 'shared/lib/hooks'
import { AllPossibleCommandType } from 'shared/types'
import { Button, ButtonText, Modal, Tab, Tabs, WarningModal } from 'shared/ui'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import styles from './modal-edit.module.scss'
interface CommandEditModalWrapperProps {
    hide: () => void
    getNewCommand: () => null | AllPossibleCommandType
    children?: ReactNode
    commandName: string
    commandsType: 'default' | 'custom'
    variables: string[]
}

export const CommandEditModalWrapper = ({
    hide,
    getNewCommand,
    children,
    commandName,
    commandsType,
    variables,
}: CommandEditModalWrapperProps) => {
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

    const [tab, setTab] = useState<'settings' | 'variables'>('settings')
    const [showWarning, toggleShowWarning] = useModal()

    const uniqueVariables = [...new Set([...variables])]
    const variableListIsNotEmpty = variables.length !== 0

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
                headerDivider={!variableListIsNotEmpty}
                expandedWidth
            >
                {variableListIsNotEmpty && (
                    <div className={styles.editCommandNav}>
                        <Tabs line>
                            <Tab isFocus={tab === 'settings'} onClick={() => setTab('settings')}>
                                {t('edit-commands.settings')}
                            </Tab>
                            <Tab isFocus={tab === 'variables'} onClick={() => setTab('variables')}>
                                {t('edit-commands.variables')}
                            </Tab>
                        </Tabs>
                    </div>
                )}
                {tab === 'settings' ? (
                    children
                ) : (
                    <div className={styles.editCommandVariables}>
                        <div className={styles.editCommandVariablesHeader}>
                            <span>{t('variables-list.name')}</span>
                            <span>{t('variables-list.description')}</span>
                            <span>{t('variables-list.result')}</span>
                        </div>
                        {uniqueVariables.map((variable) => (
                            <div key={variable} className={styles.editCommandVariable}>
                                <span
                                    className={clsx(
                                        styles.editCommandVariableDescription,
                                        styles.editCommandVariableName,
                                    )}
                                >
                                    {variable}
                                </span>
                                <span className={styles.editCommandVariableDescription}>
                                    {t(`variables-list.${variable}.description`)}
                                </span>
                                <span className={styles.editCommandVariableDescription}>
                                    {t(`variables-list.${variable}.result`)}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </Modal>
        </>
    )
}
