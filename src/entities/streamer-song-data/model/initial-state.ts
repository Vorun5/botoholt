import { StreamerSongDataSlice } from './type'

export const initialState: StreamerSongDataSlice = {
    streamer: {
        status: 'idle',
        error: null,
        data: {
            name: '',
            description: '',
            donationAlerts: '',
            followers: 0,
            image: '',
            login: '',
            socialMedias: null,
            streamInfo: null,
            type: 'affiliate',
        },
    },
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
        total: 0,
    },
    topDjs: {
        status: 'idle',
        error: null,
        period: 'week',
        list: [],
        total: 0,
    },
    topSongs: {
        status: 'idle',
        error: null,
        period: 'week',
        list: [],
        total: 0,
    },
}
