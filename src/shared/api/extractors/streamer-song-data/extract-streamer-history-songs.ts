import { StreamerHistorySongDto } from 'shared/api/dto'
import { StreamerHistorySong } from 'shared/types'

export const extractStreamerHistorySongs = (streamerHistorySongs: StreamerHistorySongDto[]): StreamerHistorySong[] => {
    return streamerHistorySongs.map((streamerHistorySong) => ({
        id: streamerHistorySong._id,
        name: streamerHistorySong.mediaName,
        link: streamerHistorySong.mediaLink,
        sender: streamerHistorySong.requestedBy,
        date: streamerHistorySong.timeFrom,
    }))
}
