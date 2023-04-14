import { api, extractStreamerHistorySongs, StreamerHistorySongDto } from 'shared/api'

export const getStreamerHistory = async (login: string) => {
    const response = await api.get(`${login}/songs`).json<StreamerHistorySongDto[]>()

    return extractStreamerHistorySongs(response)
}
