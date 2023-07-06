import { createAsyncThunk } from '@reduxjs/toolkit'
import { getStreamer } from 'entities/streamer/api/get-streamer'
import { StreamerSlice } from 'entities/streamer/model/type'
import { Streamer } from 'shared/types'

export const loadStreamer = createAsyncThunk<
    Streamer,
    string,
    { state: { streamer: StreamerSlice }; rejectValue: string }
>(
    'streamer/load',
    async (login: string, { rejectWithValue }) => {
        try {
            const streamer = await getStreamer(login)

            return streamer
        } catch (error) {
            if (error instanceof Error) return rejectWithValue(error.message)

            return rejectWithValue('Unknown error')
        }
    },
    {
        condition: (_, { getState }) => {
            if (getState().streamer.status === 'loading') {
                return false
            }
        },
    },
)
