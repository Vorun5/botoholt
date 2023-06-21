import { ReactNode } from 'react'
import { Button, ButtonText, Toggle } from 'shared/ui'
import styles from './command-table.module.scss'

const Cell = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.cell}>
            <span className={styles.cellText}>{children}</span>
        </div>
    )
}

interface CommandTableItemProps {
    status: boolean
    type: 'Текущий трек' | 'Последний трек' | 'Длительность очереди' | 'Доступные команды'
    commands: string[]
    answer: string
    access: 'Всем' | 'Подписчики' | 'Випы' | 'Модераторы' | 'Никто'
    cd: string
}

export const CommandTableItem = ({ status, type, commands, answer, access, cd }: CommandTableItemProps) => {
    return (
        <div className={styles.command}>
            <Cell>
                <Toggle checked={status} />
            </Cell>
            <Cell>{type}</Cell>
            <Cell>{commands.map((command) => command + ' ')}</Cell>
            <Cell>{answer}</Cell>
            <Cell>{access}</Cell>
            <Cell>{cd}</Cell>
            <Cell>
                <Button>
                    <ButtonText>Ааа</ButtonText>
                </Button>
            </Cell>
        </div>
    )
}
