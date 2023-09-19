import { clearStringFromSpaces } from 'shared/lib/helpers'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { SongListProps, StreamerPageTab } from '../ui'

const DEFAULT_SEARCH_PARAMS: Readonly<Pick<SongListProps, 'limit' | 'page' | 'period' | 'searchStr' | 'searchType'>> = {
    searchStr: '',
    limit: 50,
    period: 'week',
    page: 1,
    searchType: 'name',
}

const newSearchParam = <T>(defaultValue: T, value: T | undefined) => {
    if (typeof value === 'undefined' || value === defaultValue) return
    if (typeof value === 'string' && !clearStringFromSpaces(value)) return

    return String(value)
}

// const removeUndefinedFields = <T extends Object>(obj: T): Record<keyof T, NonNullable<T[keyof T]>> => {
//     const cleanedObject: Record<keyof T, NonNullable<T[keyof T]>> = {} as any

//     for (const key in obj) {
//         if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
//             cleanedObject[key] = obj[key] as NonNullable<T[keyof T]>
//         }
//     }

//     return cleanedObject
// }

// type SongListSearchParams = {
//     limit?: string
//     page?: string
//     period?: string
//     searchStr?: string
//     searchType?: string
// }

export const getNewSongListSearchParams = (searchParams: Partial<Omit<SongListProps, 'login' | 'tab'>>) => {
    const l = newSearchParam(DEFAULT_SEARCH_PARAMS.limit, searchParams.limit)
    const a = l ? { limit: l } : {}

    return {
        limit: newSearchParam(DEFAULT_SEARCH_PARAMS.limit, searchParams.limit),
        page: newSearchParam(DEFAULT_SEARCH_PARAMS.page, searchParams.page),
        period: newSearchParam(DEFAULT_SEARCH_PARAMS.period, searchParams.period),
        searchStr: newSearchParam(DEFAULT_SEARCH_PARAMS.searchStr, searchParams.searchStr),
        searchType: newSearchParam(DEFAULT_SEARCH_PARAMS.searchType, searchParams.searchType),
    }
}

export const useSongListSearchParams = (baseUrl: string): Omit<SongListProps, 'login'> => {
    const [searchParams] = useSearchParams()
    const path = window.location.pathname

    let tab: StreamerPageTab = 'queue'
    if (path.includes(`${baseUrl}/h`)) tab = 'history'
    if (path.includes(`${baseUrl}/top/djs`)) tab = 'top-djs'
    if (path.includes(`${baseUrl}/top/songs`)) tab = 'top-songs'
    if (path === `${baseUrl}`) tab = 'queue'

    const searchStr = z.string().catch(DEFAULT_SEARCH_PARAMS.searchStr).parse(searchParams.get('search_str'))
    const searchType = z
        .union([z.literal('name'), z.literal('sender')])
        .catch(DEFAULT_SEARCH_PARAMS.searchType)
        .parse(searchParams.get('search_type'))
    const page = z
        .number()
        .min(1)
        .catch(DEFAULT_SEARCH_PARAMS.page)
        .parse(parseInt(searchParams.get('page') ?? '-1'))
    const limit = z
        .number()
        .min(20)
        .max(200)
        .catch(DEFAULT_SEARCH_PARAMS.limit)
        .parse(parseInt(searchParams.get('limit') ?? '-1'))
    const period = z
        .union([z.literal('week'), z.literal('month'), z.literal('alltime')])
        .catch(DEFAULT_SEARCH_PARAMS.period)
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
