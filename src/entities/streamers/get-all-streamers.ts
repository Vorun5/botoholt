import { api, extractStreamer, StreamerDto } from 'shared/api'

export const getAllStreamers = async () => {
    const response = await api.get('streams').json<StreamerDto[]>()

    return response.map((streamerDto) => extractStreamer(streamerDto))
}
