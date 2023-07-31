import { Streamer } from 'shared/types'

export const sortStreamers = (streamers: Streamer[]) =>
    streamers.sort((a, b) => (a.followers < b.followers ? 1 : -1)).sort((a, b) => (a.streamInfo ? -1 : 1))
