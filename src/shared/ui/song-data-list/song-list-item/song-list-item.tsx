import { ListItemProps, Listitem } from '../list-item/list-item'
import { ListItemName } from '../list-item-name/list-item-name'
import styles from './song-list-item.module.scss'

interface SongListItem extends Omit<ListItemProps, 'children'> {
    songName: string
    songLink: string
    sender: string
}

export const SongListItem = ({ number, extraInfo, songName, songLink, sender }: SongListItem) => {
    return (
        <Listitem number={number} extraInfo={extraInfo}>
            <ListItemName link={songLink}>{songName}</ListItemName>
            <span className={styles.sender}>
                Order from: <b>{sender}</b>
            </span>
        </Listitem>
    )
}
