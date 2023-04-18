import clsx from 'clsx'
import { ReactNode, useRef } from 'react'
import { useElementSize } from 'shared/lib/hooks'
import styles from './list-item.module.scss'

export interface ListItemProps {
    number: number
    extraInfo: string
    children: ReactNode
}

export const ListItem = ({ number, extraInfo, children }: ListItemProps) => {
    const itemRef = useRef(null)
    const { width } = useElementSize(itemRef)

    return (
        <li ref={itemRef} className={clsx(styles.item, width < 450 && styles.itemCompact)}>
            <span className={styles.itemInfo}>{number}</span>
            <div className={styles.itemContent}>{children}</div>
            <span className={styles.itemInfo}>{extraInfo}</span>
        </li>
    )
}
