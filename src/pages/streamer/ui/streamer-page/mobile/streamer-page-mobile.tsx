import { SongList, SongListNavigation } from 'widgets/song-list'
import { CurrentSong } from 'entities/streamer-song-data'
import { StreamerCard } from 'entities/streamers'
import { useTranslation } from 'react-i18next'

import { Ads } from '../../ads/ads'
import { StreamerPageProps } from '../streamer-page.props'

import styles from './streamer-page-mobile.module.scss'

export const StreamerPageMobile = ({ streamer, tab, period, from, name, by }: StreamerPageProps) => {
    const { t } = useTranslation()

    return (
        <>
            <StreamerCard
                className={styles.card}
                title={t('streamer-card.title') ?? 'Информация о канале'}
                streamer={streamer}
            />
            <CurrentSong className={styles.song} streamerName={streamer.name} />
            <SongListNavigation
                tab={tab}
                period={period}
                login={streamer.login}
                baseUrlForRedirect={`/${streamer.login}`}
            />
            <SongList period={period} tab={tab} streamerName={streamer.name} from={from} name={name} by={by} />
            <Ads className={styles.ads} donationAlertsLink={streamer.donationAlerts} />
        </>
    )
}
