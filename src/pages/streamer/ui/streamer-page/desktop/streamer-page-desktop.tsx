import { useTranslation } from 'react-i18next'
import { CurrentSong } from 'entities/streamer-song-data'
import { StreamerCard } from 'entities/streamers'
import { Ads } from '../../ads/ads'
import { Navigation } from '../../navigation/navigation'
import { SongList } from '../../song-list'
import { StreamerPageProps } from '../streamer-page.props'
import styles from './streamer-page-desktop.module.scss'

export const StreamerPageDesktop = ({ streamer, tab, period }: StreamerPageProps) => {
    const { t } = useTranslation()

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.wrapperLeft}>
                    <StreamerCard title={t('streamer-card.title') ?? 'Информация о канале'} streamer={streamer.data} />
                </div>
                <div className={styles.wrapperRight}>
                    <CurrentSong center={false} />
                    <Ads className={styles.ads} donationAlertsLink={streamer.data.donationAlerts} />
                    <Navigation tab={tab} period={period} login={streamer.data.login} />
                    <div className={styles.content}>
                        <div className={styles.list}>
                            <SongList period={period} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
