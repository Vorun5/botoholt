import { api, extractStreamerTopDjs, StreamerTopDjDto } from 'shared/api'
import { Period } from 'shared/types'

export const getStreamerTopDjs = async (login: string, period: Period) => {
    const response = await api.get(`${login}/songs/top/djs/${period}`).json<StreamerTopDjDto[]>()

    return extractStreamerTopDjs(response)
}
