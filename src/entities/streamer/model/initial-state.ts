import { StreamerSlice } from './type'

export const initialState: StreamerSlice = {
    status: 'idle',
    error: null,
    streamer: {
        name: '',
        description: '',
        donationAlerts: '',
        followers: 0,
        image: '',
        login: '',
        socialMedias: null,
        streamInfo: null,
        type: 'affiliate',
        backgroundImage: '',
    },
}
