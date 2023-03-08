import { Streamer } from 'models/Streamer'
import { StreamerQueue } from 'models/StreamerQueue'

export interface StreamerPageProps {
    streamer: Streamer
}

const queueToSongPlaying = (queue: StreamerQueue) => {
    return {
        isPlaying: queue.isPlaying,
        nowPlayingName: queue.nowPlayingName,
        nowPlayingLink: queue.nowPlayingLink,
        nowPlayingStartsFrom: queue.nowPlayingStartsFrom,
        nowPlayingDuration: queue.nowPlayingDuration,
        nowPlayingOwner: queue.nowPlayingOwner,
    }
}

const streamerSocialMedias = (streamer: Streamer) => [
    {
        id: 'id',
        name: 'twitch',
        title: 'Twitch',
        url: `https://twitch.com/${streamer.login}`,
    },
    ...streamer.socialMedias!,
]

export { queueToSongPlaying, streamerSocialMedias }
