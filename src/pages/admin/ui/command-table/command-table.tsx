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
    return (
        <div className={styles.commands}>
            <div className={styles.commandsHeadlines}>
                <CellName>Статус</CellName>
                <CellName>Тип</CellName>
                <CellName>Команда</CellName>
                <CellName>Ответ</CellName>
                <CellName>Разрешение</CellName>
                <CellName>CD</CellName>
                <CellName>Действие</CellName>
            </div>
            <div className={styles.commandsItems}>
                {commands.map((command, index) => (
                    <CommandTableItem key={index} focus={(index + 1) / 2 === 1} command={command} />
                ))}
            </div>
        </div>
    )
}
