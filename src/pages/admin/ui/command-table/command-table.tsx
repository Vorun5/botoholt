import { useState } from 'react'
import {
    useAdminCommandsMutation,
    useAdminCustomCommandsDeleteMutation,
    useAdminCustomCommandsMutation,
} from 'entities/commands'
import {
    Command,
    isCustomCommand,
    isLastSongCommand,
    isQueueCommand,
    isSongCommand,
    isWhichCommand,
} from 'shared/types'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { EditCustomCommand } from '../modal-edit/edit-custom-command'
import { EditLastSongCommand } from '../modal-edit/edit-last-song-command'
import { EditQueueCommand } from '../modal-edit/edit-queue-command'
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
}: {
    commands: Command[]
    commandsType: 'default' | 'custom'
}) => {
    const { t } = useTranslation()

    const [currentEditCommand, setCurrentEditCommand] = useState<Command | null>(null)
    const hide = () => setCurrentEditCommand(null)

    const { mutate: toggleDefaultCommand, isLoading: isDefaultLoading } = useAdminCommandsMutation()
    const { mutate: toggleCustomCommand, isLoading: isCustomLoading } = useAdminCustomCommandsMutation()
    const { mutate: deleteCustomCommand, isLoading: isCustomDeleteLoading } = useAdminCustomCommandsDeleteMutation()

    const isLodaing = commandsType === 'custom' ? isCustomLoading || isCustomDeleteLoading : isDefaultLoading
    const toggleCommand = commandsType === 'custom' ? toggleCustomCommand : toggleDefaultCommand

    return (
        <>
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
                    {commands.map((command, index) => (
                        <CommandTableItem
                            key={command.function}
                            onToggle={() => toggleCommand({ ...command, enabled: !command.enabled })}
                            focus={(index + 1) % 2 === 1}
                            command={command}
                            onEdit={() => setCurrentEditCommand(command)}
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
                </>
            )}
        </>
    )
}
