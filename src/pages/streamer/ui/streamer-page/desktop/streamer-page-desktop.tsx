import { SongList, SongListNavigation } from 'widgets/song-list'
import { CurrentSong } from 'entities/streamer-song-data'
import { StreamerCard } from 'entities/streamers'
import { useTranslation } from 'react-i18next'

import { Ads } from '../../ads/ads'
import { StreamerPageProps } from '../streamer-page-props'

import styles from './streamer-page-desktop.module.scss'

export const StreamerPageDesktop = ({ streamer, tab, period, from, searchStr, searchType }: StreamerPageProps) => {
    const { t } = useTranslation()

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.wrapperLeft}>
                    <StreamerCard title={t('streamer-card.title') ?? 'Channel info'} streamer={streamer} />
                </div>
                <div className={styles.wrapperRight}>
                    <CurrentSong center={false} streamerName={streamer.name} />
                    <Ads className={styles.ads} donationAlertsLink={streamer.donationAlerts} />
                    <SongListNavigation
                        login={streamer.login}
                        baseUrlForRedirect={`/${streamer.login}`}
                        tab={tab}
                        period={period}
                    />
                    <div className={styles.content}>
                        <div className={styles.list}>
                            <SongList
                                tab={tab}
                                period={period}
                                login={streamer.name}
                                from={from}
                                searchStr={searchStr}
                                searchType={searchType}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
