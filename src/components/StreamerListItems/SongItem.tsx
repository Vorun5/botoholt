import styles from './StreamerListItems.module.css'
import SongListItem from 'models/SongListItem'
import { useTranslation } from 'react-i18next'

const SongItem = ({ song }: { song: SongListItem }) => {
    const { t } = useTranslation()

    return (
        <div className={styles.container}>
            <span className={styles.number}>{song.number}</span>
            <div className={styles.info}>
                <a
                    className={`${styles.name} ${styles.hoverable}`}
                    href={song.mediaLink}
                    target="_blank"
                    rel="noreferrer"
                >
                    {song.mediaName}
                </a>
                <span className={styles.by}>
                    {t('song-card.by')} <span>{song.requestedBy}</span>
                </span>
            </div>
            <div className={styles.extra}>{song.extraText}</div>
        </div>
    )
}

export default SongItem
