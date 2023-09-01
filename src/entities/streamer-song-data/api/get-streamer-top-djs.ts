import { api, extractStreamerTopDjs, StreamerTopDjDto } from 'shared/api'
import { Period } from 'shared/types'

import { PaginationParams } from './pagination-params'

export const getStreamerTopDjs = async ({
    login,
    period,
    limit,
    from,
    by,
}: PaginationParams & {
    period: Period
    by?: string
}) => {
    const response = await api
        .get(`${login}/songs/top/djs/${period}?limit=${limit}&from=${from}${by ? `&by=${by}` : ''}`)
        .json<any[]>()

    const list = response[0]['results'] as StreamerTopDjDto[]
    const total = response[0]['totalResults'] as number

    return { list: extractStreamerTopDjs(list), total, from }
}
