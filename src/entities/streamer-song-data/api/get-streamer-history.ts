import { api, extractStreamerHistorySongs, StreamerHistorySongDto } from 'shared/api';

export const getStreamerHistory = async (login: string, limit: number, from: number) => {
    const response = await api.get(`${login}/songs?limit=${limit}&from=${from}`).json<any[]>()

    const list = response[0]['results'] as StreamerHistorySongDto[]
    const total = response[0]['totalResults'] as number

    return { list: extractStreamerHistorySongs(list), total: total, from: from }
}
