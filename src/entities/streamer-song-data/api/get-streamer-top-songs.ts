import { api, extractStreamerTopSongs, StreamerSongListTotalDto, StreamerTopSongDto } from 'shared/api'
import { Period } from 'shared/types'

export const getStreamerTopSongs = async (login: string, period: Period) => {
    const response = await api
        .get(`${login}/songs/top/${period}`)
        .json<(StreamerTopSongDto | StreamerSongListTotalDto)[]>()
    const list = response.slice(0, -1) as StreamerTopSongDto[]
    const total = response[response.length - 1] as StreamerSongListTotalDto

    return { list: extractStreamerTopSongs(list), total: total.total }
}
