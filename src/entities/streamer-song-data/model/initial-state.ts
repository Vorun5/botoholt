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
    },
    topDjs: {
        status: 'idle',
        error: null,
        period: 'week',
        list: [],
    },
    topSongs: {
        status: 'idle',
        error: null,
        period: 'week',
        list: [],
    },
}
