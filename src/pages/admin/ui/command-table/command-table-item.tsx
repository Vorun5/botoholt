import clsx from 'clsx'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
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
    onEdit: () => void
}

export const CommandTableItem = ({ focus, command, onEdit }: CommandTableItemProps) => {
    const { t } = useTranslation()

    return (
        <div className={clsx(styles.command, focus && styles.commandFocus)}>
            <Cell>
                <Toggle checked={command.enabled} onChange={() => {}} />
            </Cell>
            <Cell>{t(command.function)}</Cell>
            <Cell>
                <div className={styles.commandTags}>
                    {command.aliases.map((alias, index) => (
                        <CommandTag key={index}>{alias}</CommandTag>
                    ))}
                </div>
            </Cell>
            {/* 
            <Cell>{'Answer'}</Cell>
            <Cell>{'Доступ'}</Cell>
            */}
            <Cell>
                {command.cooldown.toString()} {t('seconds-2')}
            </Cell>
            <Cell>
                <div className={styles.commandActions}>
                    <Button width="66px" border padding="small" onClick={onEdit}>
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
