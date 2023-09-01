import { api, extractStreamerHistorySongs, StreamerHistorySongDto } from 'shared/api'

import { PaginationParams } from './pagination-params'

export const getStreamerHistory = async ({
    login,
    limit,
    from,
    by,
    name,
}: PaginationParams & {
    by?: string
    name?: string
}) => {
    const response = await api
        .get(`${login}/songs?limit=${limit}&from=${from}${by ? `&by=${by}` : ''}${name ? `&name=${name}` : ''}`)
        .json<any[]>()

    const list = response[0]['results'] as StreamerHistorySongDto[]
    const total = response[0]['totalResults'] as number

    return { list: extractStreamerHistorySongs(list), total, from, by, name }
}
