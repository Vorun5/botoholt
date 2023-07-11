import { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { changeCommand, selectCommandСhange } from 'entities/commands'
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

    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        if (isMounted) {
            setLoadingChanges(commandChanges.status === 'loading')
            if (commandChanges.status === 'rejected') changesNotSavedToast(commandChanges.error ?? '')
            if (commandChanges.status === 'received') {
                changesSavedToast()
                hide()
                document.body.classList.remove('modal-show')
            }
        } else {
            setIsMounted(true)
        }
    }, [commandChanges])

    return (
        <Modal
            isShown
            dontHide={loadingChanges}
            hide={hide}
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
    )
}
