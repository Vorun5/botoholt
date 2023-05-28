import {
    Status,
    Streamer,
    StreamerHistorySong,
    StreamerQueue,
    StreamerTopDj,
    StreamerTopSong,
} from 'shared/types';
import { Period } from 'shared/types';

export type StreamerSongDataSlice = {
    streamer: {
        error: string | null
        status: Status
        data: Streamer
    }
    queue: {
        error: string | null
        status: Status
        data: StreamerQueue
    }
    history: {
        error: string | null
        status: Status
        list: StreamerHistorySong[]
        total: number
    }
    topSongs: {
        error: string | null
        status: Status
        period: Period
        list: StreamerTopSong[]
        total: number
    }
    topDjs: {
        error: string | null
        status: Status
        period: Period
        list: StreamerTopDj[]
        total: number
    }
}
