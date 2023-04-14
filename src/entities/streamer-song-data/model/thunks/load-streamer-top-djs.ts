import { createAsyncThunk } from '@reduxjs/toolkit'
import { getStreamerTopDjs } from 'entities/streamer-song-data/api/get-streamer-top-djs'
import { Period, StreamerTopDj } from 'shared/types'
import { StreamerSongDataSlice } from '../type'

export const loadStreamerTopDjs = createAsyncThunk<
    StreamerTopDj[],
    { login: string; period: Period },
    { state: { streamerSongData: StreamerSongDataSlice }; rejectValue: string }
>(
    'streamerSongData/loadStreamerTopDjs',
    async (params: { login: string; period: Period }, { rejectWithValue }) => {
        try {
            const streamerTopDjs = await getStreamerTopDjs(params.login, params.period)

            return streamerTopDjs
        } catch (error) {
            if (error instanceof Error) return rejectWithValue(error.message)

            return rejectWithValue('Unknown error')
        }
    },
    {
        condition: (_, { getState }) => {
            if (getState().streamerSongData.topDjs.status === 'loading') {
                return false
            }
        },
    },
)
