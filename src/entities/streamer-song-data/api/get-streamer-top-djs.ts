import { api, extractStreamerTopDjs, StreamerSongListTotalDto, StreamerTopDjDto } from 'shared/api'
import { Period } from 'shared/types'

export const getStreamerTopDjs = async (login: string, period: Period) => {
    const response = await api
        .get(`${login}/songs/top/djs/${period}`)
        .json<(StreamerTopDjDto | StreamerSongListTotalDto)[]>()
    const list = response.slice(0, -1) as StreamerTopDjDto[]
    const total = response[response.length - 1] as StreamerSongListTotalDto

    return { list: extractStreamerTopDjs(list), total: total.total }
}
