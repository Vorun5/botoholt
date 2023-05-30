import { createAsyncThunk } from '@reduxjs/toolkit'
import { getStreamerHistory } from 'entities/streamer-song-data/api/get-streamer-history'
import { StreamerHistorySong } from 'shared/types'
import { StreamerSongDataSlice } from '../type'
import { LoadParamType } from './load-param-type'

export const loadStreamerHistorySongs = createAsyncThunk<
    { list: StreamerHistorySong[]; total: number, from: number },
    LoadParamType,
    { state: { streamerSongData: StreamerSongDataSlice }; rejectValue: string }
>(
    'streamerSongData/loadStreamerHistory',
    async (params: LoadParamType, { rejectWithValue }) => {
        try {
            const streamerHistory = await getStreamerHistory(params.login, params.limit, params.from)

            return streamerHistory
        } catch (error) {
            if (error instanceof Error) return rejectWithValue(error.message)

            return rejectWithValue('Unknown error')
        }
    },
    {
        condition: (_, { getState }) => {
            if (getState().streamerSongData.history.status === 'loading') {
                return false
            }
        },
    },
)
