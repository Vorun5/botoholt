import { createAsyncThunk } from '@reduxjs/toolkit'
import { getStreamerTopDjs } from 'entities/streamer-song-data/api/get-streamer-top-djs'
import { StreamerTopDj } from 'shared/types'
import { StreamerSongDataSlice } from '../type'
import { LoadParamWithPeriodType } from './load-param-with-period-type'

export const loadStreamerTopDjs = createAsyncThunk<
    { list: StreamerTopDj[]; total: number, from: number },
    LoadParamWithPeriodType,
    { state: { streamerSongData: StreamerSongDataSlice }; rejectValue: string }
>(
    'streamerSongData/loadStreamerTopDjs',
    async (params: LoadParamWithPeriodType, { rejectWithValue }) => {
        try {
            const streamerTopDjs = await getStreamerTopDjs(params.login, params.period, params.limit, params.from)

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
