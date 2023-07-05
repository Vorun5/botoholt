import { createAsyncThunk } from '@reduxjs/toolkit'
import { getStreamerTopSongs } from 'entities/streamer-song-data/api'
import { StreamerTopSong } from 'shared/types'
import { StreamerSongDataSlice } from '../type'
import { LoadParamWithPeriodType } from './load-param-with-period-type'

export const loadStreamerTopSongs = createAsyncThunk<
    { list: StreamerTopSong[]; total: number; from: number },
    LoadParamWithPeriodType,
    { state: { streamerSongData: StreamerSongDataSlice }; rejectValue: string }
>(
    'streamerSongData/loadStreamerTopSongs',
    async (params: LoadParamWithPeriodType, { rejectWithValue }) => {
        try {
            const streamerTopSongs = await getStreamerTopSongs(params.login, params.period, params.limit, params.from)

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
