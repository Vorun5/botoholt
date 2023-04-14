import { Status, Streamer } from 'shared/types'

export type StreamersSlice = {
    error: string | null
    status: Status
    list: Streamer[]
}
