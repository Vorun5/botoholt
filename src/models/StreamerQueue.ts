import { QueueSong } from 'models/QueueSong'

export interface StreamerQueue {
    isPlaying: boolean
    nowPlayingName: string | null
    nowPlayingLink: string | null
    nowPlayingStartsFrom: number | null
    nowPlayingDuration: number | null
    nowPlayingOwner: string | null
    queueList: Array<QueueSong>
}
