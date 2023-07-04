import { useTranslation } from 'react-i18next'
import { ListItemProps, ListItem } from '../list-item/list-item'
import { ListItemName } from '../list-item-name/list-item-name'
import styles from './song-list-item.module.scss'

interface SongListItem extends Omit<ListItemProps, 'children'> {
    songName: string
    songLink: string
    sender: string
}

export const SongListItem = ({ number, extraInfo, songName, songLink, sender }: SongListItem) => {
    const { t } = useTranslation()

    return (
        <ListItem number={number} extraInfo={extraInfo} ytLideoLink={songLink}>
            <ListItemName link={songLink}>{songName}</ListItemName>
            <span className={styles.sender}>
                {t('song-card.by')}
                <b>{sender}</b>
            </span>
        </ListItem>
    )
}

// export const SongListItem = memo(function SongListItem({
//     number,
//     extraInfo,
//     songName,
//     songLink,
//     sender,
// }: SongListItem) {
//     const { t } = useTranslation()
//     console.log(number);

//     return (
//         <ListItem number={number} extraInfo={extraInfo} ytLideoLink={songLink}>
//             <ListItemName link={songLink}>{songName}</ListItemName>
//             <span className={styles.sender}>
//                 {t('song-card.by')}
//                 <b>{sender}</b>
//             </span>
//         </ListItem>
//     )
// })
