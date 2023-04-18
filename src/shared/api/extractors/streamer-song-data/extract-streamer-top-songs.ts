import { StreamerTopSongDto } from 'shared/api'
import { StreamerTopSong } from 'shared/types'

export const extractStreamerTopSongs = (streamerTopSongs: StreamerTopSongDto[]): StreamerTopSong[] => {
    return streamerTopSongs.map((streamerTopSong) => ({
        name: streamerTopSong.mediaName,
        link: streamerTopSong.mediaLink,
        amount: streamerTopSong.count,
    }))
}
