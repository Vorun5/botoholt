import { api, extractStreamerHistorySongs, StreamerHistorySongDto, StreamerSongListTotalDto } from 'shared/api'

export const getStreamerHistory = async (login: string) => {
    const response = await api.get(`${login}/songs`).json<(StreamerHistorySongDto | StreamerSongListTotalDto)[]>()
    const list = response.slice(0, -1) as StreamerHistorySongDto[]
    const total = response[response.length - 1] as StreamerSongListTotalDto

    return { list: extractStreamerHistorySongs(list), total: total.total }
}
