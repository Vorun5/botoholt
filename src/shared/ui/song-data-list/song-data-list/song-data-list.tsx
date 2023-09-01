import { ReactNode } from 'react'

import styles from './song-data-list.module.scss'

interface SongDataListProps {
    title: ReactNode
    children: ReactNode
}

export const SongDataList = ({ children, title }: SongDataListProps) => {
    return (
        <div className={styles.list}>
            <h2 className={styles.listTitle}>{title}</h2>
            <ul className={styles.listItems}>{children}</ul>
        </div>
    )
}
