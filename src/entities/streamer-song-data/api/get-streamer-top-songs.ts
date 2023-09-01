import { api, extractStreamerTopSongs, StreamerTopSongDto } from 'shared/api'
import { Period } from 'shared/types'

import { PaginationParams } from './pagination-params'

export const getStreamerTopSongs = async ({
    login,
    period,
    limit,
    from,
    name,
}: PaginationParams & {
    period: Period
    name?: string
}) => {
    const response = await api
        .get(`${login}/songs/top/${period}?limit=${limit}&from=${from}${name ? `&name=${name}` : ''}`)
        .json<any[]>()

    const list = response[0]['results'] as StreamerTopSongDto[]
    const total = response[0]['totalResults'] as number

    return { list: extractStreamerTopSongs(list), total, from }
}
