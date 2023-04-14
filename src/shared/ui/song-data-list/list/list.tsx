import { ReactNode } from 'react'
import { SearchField } from 'shared/ui'
import styles from './list.module.scss'

interface ListProps {
    title: string
    children: ReactNode
    searchFun: (str: string) => void
}

export const List = ({ children, searchFun, title }: ListProps) => {
    return (
        <div className={styles.list}>
            <h2 className={styles.listTitle}>{title}</h2>
            <SearchField value="123" onChange={(str: string) => {}} />
            <ul className={styles.listItems}>{children}</ul>
        </div>
    )
}
