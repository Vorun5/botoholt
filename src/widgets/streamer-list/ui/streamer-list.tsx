import { StreamerCard, useStreamersQuery } from 'entities/streamers'
import { ErrorMessage, Loading } from 'shared/ui'
import { Link } from 'react-router-dom'

import styles from './streamer-list.module.scss'

export const StreamerList = () => {
    const { data: streamers, isLoading, isError, isSuccess, fetchStatus } = useStreamersQuery()

    return (
        <div className={styles.streamers}>
            {isLoading && (
                <div className={styles.loadingWrapper}>
                    <Loading />
                </div>
            )}
            {isError && <ErrorMessage>{`Error status: ${fetchStatus}`}</ErrorMessage>}
            {isSuccess && (
                <div className={styles.streamersList}>
                    {streamers.map((streamer) => (
                        <Link key={streamer.name} to={streamer.name.toLocaleLowerCase()}>
                            <StreamerCard twitchLinkActive={false} short streamer={streamer} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
