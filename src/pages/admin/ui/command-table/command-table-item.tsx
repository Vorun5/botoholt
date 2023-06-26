import clsx from 'clsx'
import { ReactNode } from 'react'
import { EditIcon, InfoIcon } from 'shared/assets/icons'
import { Command } from 'shared/types'
import { Button, ButtonIcon, Toggle } from 'shared/ui'
import styles from './command-table.module.scss'

const Cell = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.cell}>
            <span className={styles.cellText}>{children}</span>
        </div>
    )
}

const CommandTag = ({ children }: { children: string }) => {
    return (
        <div className={styles.commandTag}>
            <span className={styles.commandTagName}>{children}</span>
        </div>
    )
}

export interface CommandTableItemProps {
    focus: boolean
    command: Command
}

export const CommandTableItem = ({ focus, command }: CommandTableItemProps) => {
    return (
        <div className={clsx(styles.command, focus && styles.commandFocus)}>
            <Cell>
                <Toggle checked={command.status} onChange={() => {}} />
            </Cell>
            <Cell>{command.type}</Cell>
            <Cell>
                <div className={styles.commandTags}>
                    {command.commands.map((command, index) => (
                        <CommandTag key={index}>{command}</CommandTag>
                    ))}
                </div>
            </Cell>
            <Cell>{command.answer}</Cell>
            <Cell>{command.access}</Cell>
            <Cell>{command.cdInSeconds.toString()}сек</Cell>
            <Cell>
                <div className={styles.commandActions}>
                    <Button width="66px" border padding="small">
                        <ButtonIcon margin="none">
                            <EditIcon />
                        </ButtonIcon>
                    </Button>
                    <Button width="66px" border padding="small">
                        <ButtonIcon margin="none">
                            <InfoIcon />
                        </ButtonIcon>
                    </Button>
                </div>
            </Cell>
        </div>
    )
}