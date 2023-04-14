import { StreamerQueueSongDto } from './streamer-queue-song-dto'

export interface StreamerQueueDto {
    isPlaying: boolean
    nowPlayingName: string | null
    nowPlayingLink: string | null
    nowPlayingStartsFrom: number | null
    nowPlayingDuration: number | null
    nowPlayingOwner: string | null
    queueList: StreamerQueueSongDto[]
}
