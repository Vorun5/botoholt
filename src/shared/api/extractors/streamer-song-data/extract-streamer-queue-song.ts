import { StreamerQueueSongDto } from 'shared/api/dto'
import { StreamerQueueSong } from 'shared/types'

export const extractStreamQueueSong = (streamerQueueSong: StreamerQueueSongDto): StreamerQueueSong => ({
    id: streamerQueueSong.mediaId,
    name: streamerQueueSong.mediaName,
    link: streamerQueueSong.mediaLink,
    durationInSeconds: streamerQueueSong.duration,
    sender: streamerQueueSong.requestedBy,
    startFromInSeconds: streamerQueueSong.startFrom,
})
