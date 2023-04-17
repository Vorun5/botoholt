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
import { StreamerPageMobile } from './mobile/streamer-page-mobile'

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

    const isDesktop = useMediaQuery('(min-width: 10000px)')

    if (streamer.status === 'received') {
        return isDesktop ? <div>Desc</div> : <StreamerPageMobile tab={tab} period={period} streamer={streamer} />
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
