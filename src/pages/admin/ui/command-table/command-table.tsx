import { useState } from 'react'
import { useAdminCommandsMutation } from 'entities/commands'
import { Command, isLastSongCommand, isQueueCommand, isSongCommand, isWhichCommand } from 'shared/types'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

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

export const CommandTable = ({ commands }: { commands: Command[] }) => {
    const { t } = useTranslation()

    const [currentEditCommand, setCurrentEditCommand] = useState<Command | null>(null)
    const hide = () => setCurrentEditCommand(null)

    const { mutate: toggleCommand, isLoading } = useAdminCommandsMutation()

    return (
        <>
            <div className={styles.commands}>
                <div className={clsx(styles.commandsOverlay, isLoading && styles.commandsOverlayActive)}></div>
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
                            toggle={() => toggleCommand({ ...command, enabled: !command.enabled })}
                            focus={(index + 1) % 2 === 1}
                            command={command}
                            onEdit={() => setCurrentEditCommand(command)}
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
                </>
        )}
        </>
    )
}
