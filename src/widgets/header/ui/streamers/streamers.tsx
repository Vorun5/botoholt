import { useStreamersQuery } from 'entities/streamers'
import { Avatar } from 'shared/ui'
import { Link } from 'react-router-dom'

import styles from './streamers.module.scss'

const MAX_STREAMERS_SHOWING = 4

export const Streamers = () => {
    const { data: streamers, isLoading, isError } = useStreamersQuery()
    
    if (isLoading || isError) return <></>

    const count = streamers.length - MAX_STREAMERS_SHOWING
    const viewSteamers =
        streamers.length > MAX_STREAMERS_SHOWING ? streamers.slice(0, MAX_STREAMERS_SHOWING) : streamers

    return (
        <div className={styles.streamers}>
            {viewSteamers.map((streamer) => (
                <Link key={streamer.name} to={`/${streamer.name.toLocaleLowerCase()}`}>
                    <Avatar
                        image={streamer.image}
                        alt={streamer.name}
                        isOnline={streamer.online}
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
