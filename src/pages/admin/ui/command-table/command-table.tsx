import { useTranslation } from 'react-i18next'
import { Command } from 'shared/types'
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

    return (
        <div className={styles.commands}>
            <div className={styles.commandsHeadlines}>
                <CellName>{t('commands.status')}</CellName>
                <CellName>{t('commands.type')}</CellName>
                <CellName>{t('commands.commands')}</CellName>
                {/* <CellName>{t('commands.answer')}</CellName>
                <CellName>{t('commands.access')}</CellName> */}
                <CellName>CD</CellName>
                <CellName>{t('commands.actions')}</CellName>
            </div>
            <div className={styles.commandsItems}>
                {commands.map((command, index) => (
                    <CommandTableItem key={command.function} focus={(index + 1) % 2 === 1} command={command} />
                ))}
            </div>
        </div>
    )
}
