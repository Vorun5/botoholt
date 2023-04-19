import { CurrentSong } from 'entities/streamer-song-data'
import { StreamerCard } from 'entities/streamers'
import { Ads } from '../../ads/ads'
import { Navigation } from '../../navigation/navigation'
import { SongList } from '../../song-list'
import { StreamerPageProps } from '../streamer-page.props'
import styles from './streamer-page-mobile.module.scss'

export const StreamerPageMobile = ({ streamer, tab, period }: StreamerPageProps) => {
    return (
        <>
            <StreamerCard streamer={streamer.data} />
            <CurrentSong />
            <Navigation className={styles.nav} tab={tab} period={period} login={streamer.data.login} />
            <SongList />
            <Ads className={styles.ads} donationAlertsLink={streamer.data.donationAlerts} />
        </>
    )
}
