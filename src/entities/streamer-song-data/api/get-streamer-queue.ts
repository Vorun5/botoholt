import { api, extractStreamQueue, StreamerQueueDto } from 'shared/api'

export const getStreamerQueue = async (login: string) => {
    const response = await api.get(`${login}`).json<StreamerQueueDto>()

    return extractStreamQueue(response)
}
