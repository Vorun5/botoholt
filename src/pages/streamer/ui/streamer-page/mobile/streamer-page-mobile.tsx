import { StreamerPageTab } from 'pages/streamer/lib/use-nav'
import { Footer } from 'widgets/footer'
import { selectStreamer, CurrentSong } from 'entities/streamer-song-data'
import { StreamerCard } from 'entities/streamers'
import { Period } from 'shared/types'
import { PageContent } from 'shared/ui'
import { Ads } from '../../ads/ads'
import { Navigation } from '../../navigation/navigation'
import { SongList } from '../../song-list'
import styles from './streamer-page.module.scss'

interface StreamerPageMobileProps {
    tab: StreamerPageTab
    period: Period
    streamer: ReturnType<typeof selectStreamer>
}

export const StreamerPageMobile = ({ streamer, tab, period }: StreamerPageMobileProps) => {
    return (
        <>
            <PageContent>
                <StreamerCard streamer={streamer.data} />
                <CurrentSong />
                <Navigation className={styles.nav} tab={tab} period={period} login={streamer.data.login} />
                <SongList />
                <Ads className={styles.ads} donationAlertsLink={streamer.data.donationAlerts} />
            </PageContent>
            <Footer />
        </>
    )
}
