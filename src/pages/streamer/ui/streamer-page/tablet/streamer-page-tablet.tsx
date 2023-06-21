import { CurrentSong } from 'entities/streamer-song-data'
import { StreamerCard } from 'entities/streamers'
import { Ads } from '../../ads/ads'
import { Navigation } from '../../navigation/navigation'
import { SongList } from '../../song-list'
import { StreamerPageProps } from '../streamer-page.props'
import styles from './streamer-page-tablet.module.scss'

export const StreamerPageTablet = ({ streamer, tab, period }: StreamerPageProps) => {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.wrapperLeft}>
                    <StreamerCard streamer={streamer.data} />
                    <div className={styles.ads}>
                        <Ads donationAlertsLink={streamer.data.donationAlerts} />
                    </div>
                </div>
                <div className={styles.wrapperRight}>
                    <Navigation className={styles.nav} tab={tab} period={period} login={streamer.data.login} />
                    <CurrentSong className={styles.song} center={false} />
                    <SongList period={period} />
                </div>
            </div>
        </>
    )
}
