import { StreamerQueueSong } from './streamer-queue-song'

export interface StreamerQueue {
    isPlaying: boolean
    name: string | null
    link: string | null
    startsFromInSeconds: number | null
    durationInSeconds: number | null
    sender: string | null
    queue: StreamerQueueSong[]
}
