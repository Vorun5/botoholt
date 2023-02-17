import styles from './StreamerAvatar.module.css'
import clsx from 'clsx'
import { Streamer } from 'models/Streamer'

const StreamerAvatar = ({ streamer }: { streamer: Streamer }) => {
    const isOnline = streamer.streamInfo != null

    return (
        <div className={clsx(styles.container, isOnline ? styles.online : styles.offline)}>
            <img
                className={styles.img}
                src={streamer.profile_image_url}
                alt={streamer.display_name}
            />
        </div>
    )
}

export default StreamerAvatar
