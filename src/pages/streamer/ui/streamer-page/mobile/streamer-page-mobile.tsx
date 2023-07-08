import { useTranslation } from 'react-i18next'
import { SongList } from 'widgets/song-list'
import { CurrentSong } from 'entities/streamer-song-data'
import { StreamerCard } from 'entities/streamers'
import { Ads } from '../../ads/ads'
import { Navigation } from '../../navigation/navigation'
import { StreamerPageProps } from '../streamer-page.props'
import styles from './streamer-page-mobile.module.scss'

export const StreamerPageMobile = ({ streamer, tab, period }: StreamerPageProps) => {
    const { t } = useTranslation()

    return (
        <>
            <StreamerCard
                className={styles.card}
                title={t('streamer-card.title') ?? 'Информация о канале'}
                streamer={streamer}
            />
            <CurrentSong className={styles.song} streamerName={streamer.name} />
            <Navigation tab={tab} period={period} login={streamer.name.toLocaleLowerCase()} />
            <SongList period={period} streamerName={streamer.name} />
            <Ads className={styles.ads} donationAlertsLink={streamer.donationAlerts} />
        </>
    )
}
