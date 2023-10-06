import { useEffect, useState } from 'react'
import {
    useAdminCommandsMutation,
    useAdminCustomCommandsDeleteMutation,
    useAdminCustomCommandsMutation,
} from 'entities/commands'
import { AdminServicesDto } from 'shared/api'
import { DAIcon } from 'shared/assets/icons'
import { useModal } from 'shared/lib/hooks'
import {
    Command,
    isCustomCommand,
    isLastSongCommand,
    isQueueCommand,
    isRepeatCommand,
    isSongCommand,
    isWhichCommand,
} from 'shared/types'
import { Button, ButtonText, Modal } from 'shared/ui'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { EditCustomCommand } from '../modal-edit/edit-custom-command'
import { EditLastSongCommand } from '../modal-edit/edit-last-song-command'
import { EditQueueCommand } from '../modal-edit/edit-queue-command'
import { EditRepeatCommand } from '../modal-edit/edit-repeat-command'
import { EditSongCommand } from '../modal-edit/edit-song-command'
import { EditWhichCommand } from '../modal-edit/edit-which-command'
import { CommandTableItem } from './command-table-item'

import styles from './command-table.module.scss'

const CellName = ({ children }: { children: string }) => {
    return (
        <div className={styles.cell}>
            <span className={styles.cellName}>{children}</span>
        </div>
    )
}

export const CommandTable = ({
    commands,
    commandsType,
    services,
}: {
    commands: Command[]
    commandsType: 'default' | 'custom'
    services: AdminServicesDto
}) => {
    const { t } = useTranslation()

    const [currentEditCommand, setCurrentEditCommand] = useState<Command | null>(null)
    useEffect(() => {
        if (currentEditCommand) {
            for (const command of commands) {
                if (command._id === currentEditCommand._id) {
                    setCurrentEditCommand(command)
                }
            }
        }
    }, [commands])

    const hide = () => setCurrentEditCommand(null)

    const { mutate: toggleDefaultCommand, isLoading: isDefaultLoading } = useAdminCommandsMutation()
    const { mutate: toggleCustomCommand, isLoading: isCustomLoading } = useAdminCustomCommandsMutation()
    const { mutate: deleteCustomCommand, isLoading: isCustomDeleteLoading } = useAdminCustomCommandsDeleteMutation()

    const isLodaing = commandsType === 'custom' ? isCustomLoading || isCustomDeleteLoading : isDefaultLoading
    const toggleCommand = commandsType === 'custom' ? toggleCustomCommand : toggleDefaultCommand
    const [showDaWarning, toggleShowDaWarning] = useModal()

    const checkDaWarning = (command: Command) => {
        return (
            !services.da_api &&
            !command.enabled &&
            (command.function === 'bot.songs.queueProcess' || command.function === 'bot.songs.whichProcess')
        )
    }

    const sortCommands = commands.sort((a, b) => (a.aliases[0] < b.aliases[0] ? 1 : -1))

    return (
        <>
            <Modal
                hide={toggleShowDaWarning}
                isShown={showDaWarning}
                contentWithoutPadding
                hideScroll
                footerDivider
                footerContent={
                    <div className={styles.daNeedButtons}>
                        <Link to={'/admin/integrations'}>
                            <Button height="50px" style="fill-blue" onClick={toggleShowDaWarning}>
                                <ButtonText>{t('need-da.bth-text')}</ButtonText>
                            </Button>
                        </Link>
                        <Button height="50px" style="fill-red" onClick={toggleShowDaWarning}>
                            <ButtonText>{t('cancel-2')}</ButtonText>
                        </Button>
                    </div>
                }
            >
                <div className={styles.daNeedCover}>
                    <DAIcon color="white" width={155} height={179} />
                </div>
                <span className={styles.daNeedText}>{t('need-da.text')}</span>
            </Modal>
            <div className={styles.commands}>
                <div className={clsx(styles.commandsOverlay, isLodaing && styles.commandsOverlayActive)}></div>
                <div className={styles.commandsHeadlines}>
                    <CellName>{t('commands.status')}</CellName>
                    <CellName>{t('commands.type')}</CellName>
                    <CellName>{t('commands.commands')}</CellName>
                    {/*
                    <CellName>{t('commands.answer')}</CellName>
                    <CellName>{t('commands.access')}</CellName> 
                    */}
                    <CellName>CD</CellName>
                    <CellName>{t('commands.actions')}</CellName>
                </div>
                <div className={styles.commandsItems}>
                    {sortCommands.map((command, index) => (
                        <CommandTableItem
                            key={command._id}
                            onToggle={() => {
                                if (checkDaWarning(command)) {
                                    toggleShowDaWarning()
                                    return
                                }
                                toggleCommand({ ...command, enabled: !command.enabled })
                            }}
                            focus={(index + 1) % 2 === 1}
                            command={command}
                            onEdit={() => {
                                if (checkDaWarning(command)) {
                                    toggleShowDaWarning()
                                    return
                                }
                                setCurrentEditCommand(command)
                            }}
                            onDelete={
                                commandsType !== 'custom'
                                    ? undefined
                                    : () => {
                                          deleteCustomCommand(command)
                                      }
                            }
                        />
                    ))}
                </div>
            </div>
            {currentEditCommand && (
                <>
                    {isSongCommand(currentEditCommand) && <EditSongCommand hide={hide} command={currentEditCommand} />}
                    {isLastSongCommand(currentEditCommand) && (
                        <EditLastSongCommand hide={hide} command={currentEditCommand} />
                    )}
                    {isQueueCommand(currentEditCommand) && (
                        <EditQueueCommand hide={hide} command={currentEditCommand} />
                    )}
                    {isWhichCommand(currentEditCommand) && (
                        <EditWhichCommand hide={hide} command={currentEditCommand} />
                    )}
                    {isCustomCommand(currentEditCommand) && (
                        <EditCustomCommand hide={hide} command={currentEditCommand} />
                    )}
                    {isRepeatCommand(currentEditCommand) && (
                        <EditRepeatCommand hide={hide} command={currentEditCommand} />
                    )}
                </>
            )}
        </>
    )
}
