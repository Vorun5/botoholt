import { api, extractStreamerTopSongs, StreamerTopSongDto } from 'shared/api'
import { Period } from 'shared/types'

export const getStreamerTopSongs = async (login: string, period: Period) => {
    const response = await api.get(`${login}/songs/top/${period}`).json<StreamerTopSongDto[]>()

    return extractStreamerTopSongs(response)
}
