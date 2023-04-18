import { StreamerQueueDto } from 'shared/api/dto'
import { StreamerQueue } from 'shared/types'
import { extractStreamQueueSong } from './extract-streamer-queue-song'

export const extractStreamQueue = (streamerQueue: StreamerQueueDto): StreamerQueue => ({
    isPlaying: streamerQueue.isPlaying,
    name: streamerQueue.nowPlayingName,
    link: streamerQueue.nowPlayingLink,
    sender: streamerQueue.nowPlayingOwner,
    startsFromInSeconds: streamerQueue.nowPlayingStartsFrom,
    durationInSeconds: streamerQueue.nowPlayingDuration,
    queue: streamerQueue.queueList.map((queueSong) => extractStreamQueueSong(queueSong)),
})
