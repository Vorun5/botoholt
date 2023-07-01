import clsx from 'clsx'
import { ReactNode, useRef } from 'react'
import { useElementSize } from 'shared/lib/hooks'
import styles from './list-item.module.scss'

function extractVideoId(url: string | undefined): string | null {
    if (!url) return null
    const pattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
    const match = url.match(pattern)

    if (match) {
        return match[1]
    } else {
        return null
    }
}

export interface ListItemProps {
    number: number
    extraInfo: ReactNode
    children: ReactNode
    ytLideoLink?: string
}

export const ListItem = ({ number, extraInfo, children, ytLideoLink }: ListItemProps) => {
    const itemRef = useRef(null)
    const { width } = useElementSize(itemRef)
    const videoId = extractVideoId(ytLideoLink)

    return (
        <li ref={itemRef} className={clsx(styles.item, width < 450 && styles.itemCompact)}>
            {videoId !== null && (
                <a className={styles.itemImg} href={ytLideoLink} target="_blank">
                    <img src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} alt="" />
                </a>
            )}
            <span className={styles.itemInfo}>{number}</span>
            <div className={styles.itemContent}>{children}</div>
            <span className={styles.itemInfo}>{extraInfo}</span>
        </li>
    )
}
