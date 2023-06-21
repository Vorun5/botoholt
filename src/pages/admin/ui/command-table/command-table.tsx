import { SearchField } from 'shared/ui'
import { CommandTableItem } from './command-table-item'
import styles from './command-table.module.scss'

const CellName = ({ children }: { children: string }) => {
    return (
        <div className={styles.cell}>
            <span className={styles.cellName}>{children}</span>
        </div>
    )
}

export const CommandTable = () => {
    return (
        <div className={styles.table}>
            <div className={styles.tableInputContainer}>
                <SearchField plasholder="Поиск по командам" name="commands" onChange={() => {}} />
            </div>
            <div className={styles.headlines}>
                <CellName>Статус</CellName>
                <CellName>Тип</CellName>
                <CellName>Команда</CellName>
                <CellName>Ответ</CellName>
                <CellName>Разрешение</CellName>
                <CellName>CD</CellName>
                <CellName>Действие</CellName>
            </div>
            <CommandTableItem
                access="Випы"
                answer="Показывает текущий трек"
                cd="15s"
                commands={['!s', '!song', '!ы', '!трек']}
                status={false}
                type="Длительность очереди"
            />
        </div>
    )
}
