import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { SongListProps, StreamerPageTab } from '../ui'

export const useSongListNav = (baseUrl: string): Omit<SongListProps, 'login'> => {
    const [searchParams] = useSearchParams()
    const path = window.location.pathname

    let tab: StreamerPageTab = 'queue'
    if (path.includes(`${baseUrl}/h`)) tab = 'history'
    if (path.includes(`${baseUrl}/top/djs`)) tab = 'top-djs'
    if (path.includes(`${baseUrl}/top/songs`)) tab = 'top-songs'
    if (path === `${baseUrl}`) tab = 'queue'

    const searchStr = z.string().catch('').parse(searchParams.get('search_str'))
    const searchType = z
        .union([z.literal('name'), z.literal('sender')])
        .catch('name')
        .parse(searchParams.get('search_type'))
    const page = z.number().min(1).catch(1).parse(searchParams.get('page'))
    const limit = z.number().min(20).max(200).catch(50).parse(searchParams.get('limit'))
    const period = z
        .union([z.literal('week'), z.literal('month'), z.literal('alltime')])
        .catch('week')
        .parse(searchParams.get('period'))

    return {
        tab,
        period,
        limit,
        page,
        searchStr,
        searchType,
    }
}
