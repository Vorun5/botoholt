import { createAsyncThunk } from '@reduxjs/toolkit'
import { getStreamerTopSongs } from 'entities/streamer-song-data/api/get-streamer-top-songs'
import { Period, StreamerTopSong } from 'shared/types'
import { StreamerSongDataSlice } from '../type'

export const loadStreamerTopSongs = createAsyncThunk<
    { list: StreamerTopSong[]; total: number },
    { login: string; period: Period },
    { state: { streamerSongData: StreamerSongDataSlice }; rejectValue: string }
>(
    'streamerSongData/loadStreamerTopSongs',
    async (params: { login: string; period: Period }, { rejectWithValue }) => {
        try {
            const streamerTopSongs = await getStreamerTopSongs(params.login, params.period)

            return streamerTopSongs
        } catch (error) {
            if (error instanceof Error) return rejectWithValue(error.message)

            return rejectWithValue('Unknown error')
        }
    },
    {
        condition: (_, { getState }) => {
            if (getState().streamerSongData.topSongs.status === 'loading') {
                return false
            }
        },
    },
)
