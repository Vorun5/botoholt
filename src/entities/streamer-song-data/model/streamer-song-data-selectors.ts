import { RootState } from 'shared/lib/store'

export const selectStreamerCurrentSong = (state: RootState) => {
    const queueData = state.streamerSongData.queue.data
    const queue = state.streamerSongData.queue

    return {
        status: queue.status,
        error: queue.error,
        isPlaying: queueData.isPlaying,
        link: queueData.link,
        name: queueData.name,
        durationInSeconds: queueData.durationInSeconds,
        sender: queueData.sender,
        startsFromInSeconds: queueData.startsFromInSeconds,
    }
}

export const selectStreamerHistorySongs = (state: RootState) => ({ ...state.streamerSongData.history })

export const selectStreamerTopSongs = (state: RootState) => ({ ...state.streamerSongData.topSongs })

export const selectStreamerTopDjs = (state: RootState) => ({ ...state.streamerSongData.topDjs })

export const selectStreamerQueue = (state: RootState) => {
    const queue = state.streamerSongData.queue

    return {
        status: queue.status,
        error: queue.error,
        list: queue.data.queue,
    }
}
