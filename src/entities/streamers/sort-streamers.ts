import { Streamer } from 'shared/types'

export const sortStreamers = (streamers: Streamer[]) => {
    const onlineStreamers = streamers
        .filter((streamer) => streamer.streamInfo)
        .sort((a, b) => (a.followers < b.followers ? 1 : -1))
    const offlineStreamers = streamers
        .filter((streamer) => !streamer.streamInfo)
        .sort((a, b) => (a.followers < b.followers ? 1 : -1))

    return [...onlineStreamers, ...offlineStreamers]
}
