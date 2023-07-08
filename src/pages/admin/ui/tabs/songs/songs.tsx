import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SongList, SongListNavigation, useSongListNav } from 'widgets/song-list'
import { loadStreamer } from 'entities/streamer'
import {
    CurrentSong,
    SONG_LIMIT,
    loadStreamerQueue,
    loadStreamerTopDjs,
    loadStreamerTopSongs,
} from 'entities/streamer-song-data'
import { PauseIcon, SkipIcon } from 'shared/assets/icons'
import { useAppDispatch } from 'shared/lib/store'
import { AdminAuth } from 'shared/types'
import { Button, ButtonIcon, ButtonText } from 'shared/ui'
import { ALPageContent, ALPageHeader } from '../../admin-layout/admin-layout'
import styles from './songs.module.scss'

interface SongsProps {
    streamer: AdminAuth
}

export const Songs = ({ streamer }: SongsProps) => {
    const { t } = useTranslation()

    useEffect(() => {
        window.document.title = t('admin-page.nav.song-queue')
    }, [])

    // START | logic from streamer page
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadStreamer(streamer.login))
        dispatch(loadStreamerQueue(streamer.login))
    }, [dispatch, streamer])

    const [tab, period, page] = useSongListNav(streamer.login, 'admin/songs')

    useEffect(() => {
        const dispatchParams = {
            login: streamer.login,
            period: period,
            limit: SONG_LIMIT,
            from: page === -1 ? 0 : (page - 1) * SONG_LIMIT,
        }
        if (tab === 'top-songs') dispatch(loadStreamerTopSongs(dispatchParams))
        if (tab === 'top-djs') dispatch(loadStreamerTopDjs(dispatchParams))
    }, [period, tab, page])
    // logic from streamer page | END

    return (
        <>
            <ALPageHeader description={t('admin-page.songs.description') ?? undefined}>
                {t('admin-page.nav.song-queue')}
            </ALPageHeader>
            <ALPageContent className={styles.pageContent}>
                <CurrentSong streamerName={streamer.name} />
                <div className={styles.actions}>
                    <Button border height="44px">
                        <ButtonText>{t('admin-page.songs.pause')}</ButtonText>
                        <ButtonIcon margin="left">
                            <PauseIcon
                                style={{
                                    position: 'relative',
                                    top: '3px',
                                }}
                            />
                        </ButtonIcon>
                    </Button>
                    <Button border height="44px" style="orange">
                        <ButtonText>{t('admin-page.songs.skip')}</ButtonText>
                        <ButtonIcon margin="left">
                            <SkipIcon
                                style={{
                                    position: 'relative',
                                    top: '2px',
                                }}
                            />
                        </ButtonIcon>
                    </Button>
                </div>
                <SongListNavigation
                    tab={tab}
                    period={period}
                    login={streamer.login}
                    baseUrlForRedirect={`/admin/songs`}
                />
                <SongList period={period} streamerName={streamer.name} />
            </ALPageContent>
        </>
    )
}
