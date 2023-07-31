import { ReactNode, useRef } from 'react'
import { getVideoPreview } from 'shared/lib/helpers'
import { useElementSize } from 'shared/lib/hooks'
import clsx from 'clsx'

import styles from './list-item.module.scss'

export interface ListItemProps {
    number: number
    extraInfo: ReactNode
    children: ReactNode
    ytLideoLink?: string
}

export const ListItem = ({ number, extraInfo, children, ytLideoLink }: ListItemProps) => {
    const itemRef = useRef(null)
    const { width } = useElementSize(itemRef)
    const preview = getVideoPreview(ytLideoLink)

    return (
        <li ref={itemRef} className={clsx(styles.item, width < 450 && styles.itemCompact)}>
            {preview !== null && (
                <a className={styles.itemImg} href={ytLideoLink} target="_blank">
                    <img src={preview} alt="" />
                </a>
            )}
            <span className={styles.itemInfo}>{number}</span>
            <div className={styles.itemContent}>{children}</div>
            <span className={styles.itemInfo}>{extraInfo}</span>
        </li>
    )
}
