import { createAsyncThunk } from '@reduxjs/toolkit'
import { getStreamer } from 'entities/streamer-song-data/api/get-streamer'
import { Streamer } from 'shared/types'
import { StreamerSongDataSlice } from '../type'

export const loadStreamer = createAsyncThunk<
    Streamer,
    string,
    { state: { streamerSongData: StreamerSongDataSlice }; rejectValue: string }
>(
    'streamerSongData/loadStreamer',
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
            if (getState().streamerSongData.streamer.status === 'loading') {
                return false
            }
        },
    },
)
