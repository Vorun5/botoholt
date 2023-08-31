import { api, extractStreamerTopDjs, StreamerTopDjDto } from 'shared/api'
import { Period } from 'shared/types'

export const getStreamerTopDjs = async (login: string, period: Period, limit: number, from: number) => {
    const response = await api.get(`${login}/songs/top/djs/${period}?limit=${limit}&from=${from}`).json<any[]>()

    const list = response[0]['results'] as StreamerTopDjDto[]
    const total = response[0]['totalResults'] as number

    return { list: extractStreamerTopDjs(list), total: total, from: from }
}
