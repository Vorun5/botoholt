import { api, extractStreamer, StreamerDto } from 'shared/api';

export const getStreamer = async (login: string) => {
    const response = await api.get(`streams/${login}`).json<StreamerDto[]>()
    
    return extractStreamer(response[0])
}
