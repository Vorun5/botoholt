import { StreamerSongDataSlice } from './type'

export const initialState: StreamerSongDataSlice = {
    queue: {
        status: 'idle',
        error: null,
        data: {
            isPlaying: false,
            durationInSeconds: 0,
            link: '',
            name: '',
            sender: '',
            queue: [],
            startsFromInSeconds: 0,
        },
    },
    history: {
        status: 'idle',
        error: null,
        list: [],
        total: -1,
        from: -1,
    },
    topDjs: {
        status: 'idle',
        error: null,
        period: 'week',
        list: [],
        total: -1,
        from: -1,
    },
    topSongs: {
        status: 'idle',
        error: null,
        period: 'week',
        list: [],
        total: -1,
        from: -1,
    },
}
