import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
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
import { Loading, PageContent, PageContentExpanded } from 'shared/ui'
import { StreamerPageMobile } from './streamer-page-mobile'

export const StreamerPage = () => {
    const { streamerName } = useParams()
    const login = streamerName || ''
    const streamer = useSelector(selectStreamer)
    useEffect(() => {
        window.document.title = `${streamer.data.name} - Botoholt`
    }, [streamer])

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadStreamer(login))
        dispatch(loadStreamerQueue(login))
        dispatch(loadStreamerHistorySongs(login))
        dispatch(loadStreamerTopDjs({ login: login, period: 'month' }))
        dispatch(loadStreamerTopSongs({ login: login, period: 'month' }))
    }, [dispatch, streamerName])

    const updateInfo = useCallback(() => {
        dispatch(loadStreamerQueue(login))
        dispatch(loadStreamerHistorySongs(login))
    }, [dispatch, streamerName])

    useInterval(updateInfo)

    const isDesktop = useMediaQuery('(min-width: 10000px)')

    if (streamer.status === 'loading')
        return (
            <>
                <PageContent>
                    <PageContentExpanded>
                        <Loading />
                    </PageContentExpanded>
                </PageContent>
                <Footer />
            </>
        )
    if (streamer.status === 'rejected') return <span>Error!</span>

    return isDesktop ? <div>Desc</div> : <StreamerPageMobile streamer={streamer} />
}
