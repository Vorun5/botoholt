import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { StreamerCard } from 'entities/streamers'
import { selectStreamers } from 'entities/streamers'
import { Loading } from 'shared/ui'
import styles from './streamer-list.module.scss'

export const StreamerList = () => {
    const streamers = useSelector(selectStreamers)

    return (
        <div className={styles.streamers}>
            {streamers.status === 'loading' && (
                <div className={styles.loadingWrapper}>
                    <Loading />
                </div>
            )}
            {streamers.status === 'rejected' && <span>Error!</span>}
            {streamers.status === 'received' && (
                <div className={styles.streamersList}>
                    {streamers.list.map((streamer) => (
                        <Link key={streamer.name} to={streamer.name.toLocaleLowerCase()}>
                            <StreamerCard short streamer={streamer} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
