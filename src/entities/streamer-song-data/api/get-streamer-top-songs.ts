import { api, extractStreamerTopSongs, StreamerTopSongDto } from 'shared/api'
import { Period } from 'shared/types'

export const getStreamerTopSongs = async (login: string, period: Period, limit: number, from: number) => {
    const response = await api.get(`${login}/songs/top/${period}?limit=${limit}&from=${from}`).json<any[]>()

    const list = response[0]['results'] as StreamerTopSongDto[]
    const total = response[0]['totalResults'] as number

    return { list: extractStreamerTopSongs(list), total: total, from: from }
}
