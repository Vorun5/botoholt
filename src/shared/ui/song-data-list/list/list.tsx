import { ReactNode } from 'react';
import { SearchField } from 'shared/ui';

import styles from './list.module.scss';

interface ListProps {
    title: ReactNode
    children: ReactNode
    searchFun: (str: string) => void
    searchStr?: string
}

export const List = ({ children, searchFun, searchStr, title }: ListProps) => {
    return (
        <div className={styles.list}>
            <h2 className={styles.listTitle}>{title}</h2>
            <SearchField value={searchStr} onChange={searchFun} />
            <ul className={styles.listItems}>{children}</ul>
        </div>
    )
}
