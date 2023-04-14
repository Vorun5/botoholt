import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    loadStreamer,
    loadStreamerHistorySongs,
    loadStreamerQueue,
    loadStreamerTopDjs,
    loadStreamerTopSongs,
} from 'entities/streamer-song-data'
import { useMediaQuery } from 'shared/lib/hooks'
import { useAppDispatch } from 'shared/lib/store'
import { StreamerPageMobile } from './streamer-page-mobile'

export const StreamerPage = () => {
    const { streamerName } = useParams()
    const login = streamerName || ''
    const dispatch = useAppDispatch()

    useEffect(() => {
        window.document.title = `${login} - Botoholt`
    }, [streamerName])

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

    useEffect(() => {
        const timerID = setInterval(() => {
            updateInfo()
        }, 15000)
        return () => clearInterval(timerID)
    }, [updateInfo])

    const isDesktop = useMediaQuery('(min-width: 10000px)')

    return isDesktop ? <div>Desc</div> : <StreamerPageMobile />
}
