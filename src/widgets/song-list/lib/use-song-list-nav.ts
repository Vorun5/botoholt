import { useCallback, useEffect, useState } from 'react'
import { SONG_LIMIT } from 'entities/streamer-song-data'
import { ALL_AVAILABLE_PERIODS, Period } from 'shared/types'
import { useLocation, useSearchParams } from 'react-router-dom'

export type StreamerPageTab = 'queue' | 'history' | 'top-songs' | 'top-djs'

const getNumberFromSearchParam = (searchParam: string | null) => {
    let num = -1

    if (searchParam !== null) {
        try {
            num = Number.parseInt(searchParam)
            if (Number.isNaN(num) || num < 1) {
                return -1
            }
        } catch {
            console.log('Failed to parse number')
            return -1
        }
    }

    return num
}

export const useSongListNav = (
    login: string,
    baseUrl?: string,
): { tab: StreamerPageTab; period: Period; page: number; from: number } => {
    const location = useLocation()
    const [tab, setTab] = useState<StreamerPageTab>('queue')
    const [period, setPeriod] = useState<Period>('week')
    const [page, setPage] = useState(-1)
    const [limit, setLimit] = useState(-1)
    const [searchParams, _] = useSearchParams()

    const getStreamerPageTab = useCallback(() => {
        const pathname = location.pathname.toLowerCase()
        const base = baseUrl ?? ''
        if (pathname === '/' + base || pathname === '/' + base + '/' || pathname === base + '/' || pathname === base) {
            setTab('queue')
            return
        }

        if (pathname.includes(`${base}/h`)) setTab('history')
        if (pathname.includes(`${base}/top/djs`)) setTab('top-djs')
        if (pathname.includes(`${base}/top/songs`)) setTab('top-songs')
    }, [login, location])

    const getPeriodFromSearchParams = useCallback(() => {
        const searchPeriod = searchParams.get('period')
        if (searchPeriod == null || !ALL_AVAILABLE_PERIODS.includes(searchPeriod)) {
            return 'week'
        }

        return searchPeriod as Period
    }, [searchParams])

    const getPageFromSearchParams = useCallback(() => {
        return getNumberFromSearchParam(searchParams.get('page'))
    }, [searchParams])

    const getLimitFromSearchParams = useCallback(() => {
        return getNumberFromSearchParam(searchParams.get('limit'))
    }, [searchParams])

    useEffect(() => {
        getStreamerPageTab()
    }, [location])

    useEffect(() => {
        setPeriod(getPeriodFromSearchParams())
    }, [getPeriodFromSearchParams, searchParams])

    useEffect(() => {
        setPage(getPageFromSearchParams())
    }, [getPageFromSearchParams, searchParams])

    useEffect(() => {
        setLimit(getLimitFromSearchParams())
    }, [getLimitFromSearchParams, searchParams])

    return {
        tab,
        period,
        page,
        from: page === -1 ? 0 : (page - 1) * SONG_LIMIT,
    }
}
