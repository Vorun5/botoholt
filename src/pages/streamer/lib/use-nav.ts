import { useCallback, useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { ALL_AVAILABLE_PERIODS, Period } from 'shared/types'

export type StreamerPageTab = 'queue' | 'history' | 'top-songs' | 'top-djs'

export const useNav = (login: string): [StreamerPageTab, Period] => {
    const location = useLocation()
    const [tab, setTab] = useState<StreamerPageTab>('queue')
    const [period, setPeriod] = useState<Period>('week')
    const [searchParams, _] = useSearchParams()

    const getStreamerPageTab = useCallback(() => {
        const pathname = location.pathname.toLowerCase()
        const base = login.toLocaleLowerCase()

        if (pathname === '/' + base || pathname === '/' + base + '/') {
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

    useEffect(() => {
        getStreamerPageTab()
    }, [location])

    useEffect(() => {
        setPeriod(getPeriodFromSearchParams())
    }, [getPeriodFromSearchParams, searchParams])

    return [tab, period]
}
