import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNav } from 'pages/streamer/lib'
import { Footer } from 'widgets/footer'
import {
    loadStreamer,
    loadStreamerHistorySongs,
    loadStreamerQueue,
    loadStreamerTopDjs,
    loadStreamerTopSongs,
    selectStreamer,
} from 'entities/streamer-song-data'
import { useInterval, useMediaQuery } from 'shared/lib/hooks'
import { useAppDispatch } from 'shared/lib/store'
import { ErrorMessage, Loading, PageContent, PageContentExpanded } from 'shared/ui'
import { StreamerPageDesktop } from './desktop/streamer-page-desktop'
import { StreamerPageMobile } from './mobile/streamer-page-mobile'
import { StreamerPageTablet } from './tablet/streamer-page-tablet'

export const StreamerPage = () => {
    const dispatch = useAppDispatch()
    const { streamerName } = useParams()
    const login = streamerName || ''
    const streamer = useSelector(selectStreamer)

    useEffect(() => {
        window.document.title = `${streamer.data.name ? streamer.data.name : login} - Botoholt`
    }, [streamer])

    useEffect(() => {
        dispatch(loadStreamer(login))
        dispatch(loadStreamerQueue(login))
        dispatch(loadStreamerHistorySongs(login))
    }, [dispatch, streamerName])

    const updateInfo = useCallback(() => {
        dispatch(loadStreamerQueue(login))
        dispatch(loadStreamerHistorySongs(login))
    }, [dispatch, streamerName])
    useInterval(updateInfo)

    const [tab, period] = useNav(login)

    useEffect(() => {
        if (tab === 'top-djs') dispatch(loadStreamerTopDjs({ login: login, period: period }))
        if (tab === 'top-songs') dispatch(loadStreamerTopSongs({ login: login, period: period }))
    }, [period, tab])

    const isTablet = useMediaQuery('(min-width: 900px)')
    const isDesktop = useMediaQuery('(min-width: 1400px)')

    if (streamer.status === 'received') {
        if (isDesktop) return <StreamerPageDesktop tab={tab} period={period} streamer={streamer} />
        if (isTablet) return <StreamerPageTablet tab={tab} period={period} streamer={streamer} />
        return <StreamerPageMobile tab={tab} period={period} streamer={streamer} />
    }

    return (
        <>
            <PageContent>
                <PageContentExpanded>
                    {streamer.status === 'loading' && <Loading />}
                    {streamer.status === 'rejected' && <ErrorMessage>{streamer.error}</ErrorMessage>}
                </PageContentExpanded>
            </PageContent>
            <Footer />
        </>
    )
}
