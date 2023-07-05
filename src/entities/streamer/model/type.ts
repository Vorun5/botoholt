import { Status, Streamer } from 'shared/types'

export type StreamerSlice = {
    error: string | null
    status: Status
    streamer: Streamer
}
