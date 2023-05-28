import { createAsyncThunk } from '@reduxjs/toolkit'
import { getStreamerHistory } from 'entities/streamer-song-data/api/get-streamer-history'
import { StreamerHistorySong } from 'shared/types'
import { StreamerSongDataSlice } from '../type'

export const loadStreamerHistorySongs = createAsyncThunk<
    { list: StreamerHistorySong[]; total: number },
    string,
    { state: { streamerSongData: StreamerSongDataSlice }; rejectValue: string }
>(
    'streamerSongData/loadStreamerHistory',
    async (login: string, { rejectWithValue }) => {
        try {
            const streamerHistory = await getStreamerHistory(login)

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
