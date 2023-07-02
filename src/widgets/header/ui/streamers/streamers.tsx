import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectStreamers } from 'entities/streamers'
import { Avatar } from 'shared/ui'
import styles from './streamers.module.scss'

const MAX_STREAMERS_SHOWING = 4

export const Streamers = () => {
    const streamers = useSelector(selectStreamers)
    const count = streamers.list.length - MAX_STREAMERS_SHOWING
    const viewSteamers =
        streamers.list.length > MAX_STREAMERS_SHOWING ? streamers.list.slice(0, MAX_STREAMERS_SHOWING) : streamers.list

    return (
        <div className={styles.streamers}>
            {viewSteamers.map((streamer) => (
                <Link key={streamer.name} to={`/${streamer.name.toLocaleLowerCase()}`}>
                    <Avatar
                        image={streamer.image}
                        alt={streamer.name}
                        isOnline={streamer.streamInfo !== null}
                        size="60px"
                    />
                </Link>
            ))}
            {count > 0 && (
                <Link to="/">
                    <Avatar size="60px">
                        <span className={styles.streamersCount}>+{count}</span>
                    </Avatar>
                </Link>
            )}
        </div>
    )
}
