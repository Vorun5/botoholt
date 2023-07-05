import { Status, StreamerHistorySong, StreamerQueue, StreamerTopDj, StreamerTopSong } from 'shared/types';
import { Period } from 'shared/types';

export type StreamerSongDataSlice = {
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
        from: number
    }
    topSongs: {
        error: string | null
        status: Status
        period: Period
        list: StreamerTopSong[]
        total: number
        from: number
    }
    topDjs: {
        error: string | null
        status: Status
        period: Period
        list: StreamerTopDj[]
        total: number
        from: number
    }
}
