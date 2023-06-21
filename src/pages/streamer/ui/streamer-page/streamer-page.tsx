import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNav } from 'pages/streamer/lib'
import { Footer, Header } from 'widgets'
import {
    SONG_LIMIT,
    loadStreamer,
    loadStreamerQueue,
    loadStreamerTopDjs,
    loadStreamerTopSongs,
    selectStreamer,
    selectStreamerCurrentSong,
} from 'entities/streamer-song-data'
import { useMediaQuery } from 'shared/lib/hooks'
import { useAppDispatch } from 'shared/lib/store'
import { ErrorMessage, Loading, Page, PageContent, PageContentExpanded } from 'shared/ui'
import { StreamerPageDesktop } from './desktop/streamer-page-desktop'
import { StreamerPageMobile } from './mobile/streamer-page-mobile'
import { StreamerPageTablet } from './tablet/streamer-page-tablet'

export const StreamerPage = () => {
    const dispatch = useAppDispatch()
    const { streamerName } = useParams()
    const login = streamerName || ''
    const streamer = useSelector(selectStreamer)
    const song = useSelector(selectStreamerCurrentSong)

    useEffect(() => {
        if (song.isPlaying && song.name !== null) {
            window.document.title = song.name
        } else {
            window.document.title = `${streamer.data.name ? streamer.data.name : login} - Botoholt`
        }
    }, [streamer, song])

    useEffect(() => {
        dispatch(loadStreamer(login))
        dispatch(loadStreamerQueue(login))
    }, [dispatch, streamerName])

    const [tab, period, page] = useNav(login)

    useEffect(() => {
        const dispatchParams = {
            login: login,
            period: period,
            limit: SONG_LIMIT,
            from: page === -1 ? 0 : (page - 1) * SONG_LIMIT,
        }
        if (tab === 'top-songs') dispatch(loadStreamerTopSongs(dispatchParams))
        if (tab === 'top-djs') dispatch(loadStreamerTopDjs(dispatchParams))
    }, [period, tab, page])

    const isDesktop = useMediaQuery('(min-width: 1400px)')
    const isTablet = useMediaQuery('(min-width: 900px)') && !isDesktop
    const isMobile = !isDesktop && !isTablet

    return (
        <Page>
            <Header />
            <PageContent>
                <PageContentExpanded>
                    {streamer.status === 'loading' && <Loading />}
                    {streamer.status === 'rejected' && <ErrorMessage>{streamer.error}</ErrorMessage>}
                </PageContentExpanded>
                {streamer.status === 'received' && (
                    <>
                        {isDesktop && <StreamerPageDesktop tab={tab} period={period} streamer={streamer} />}
                        {isTablet && <StreamerPageTablet tab={tab} period={period} streamer={streamer} />}
                        {isMobile && <StreamerPageMobile tab={tab} period={period} streamer={streamer} />}
                    </>
                )}
            </PageContent>
            <Footer />
        </Page>
    )
}
