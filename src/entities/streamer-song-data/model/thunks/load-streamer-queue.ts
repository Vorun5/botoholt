import { createAsyncThunk } from '@reduxjs/toolkit';
import { getStreamerQueue } from 'entities/streamer-song-data/api/get-streamer-queue';
import { StreamerQueue } from 'shared/types';
import { StreamerSongDataSlice } from '../type';

export const loadStreamerQueue = createAsyncThunk<
    StreamerQueue,
    string,
    { state: { streamerSongData: StreamerSongDataSlice }; rejectValue: string }
>(
    'streamerSongData/loadStreamerQueue',
    async (login: string, { rejectWithValue }) => {
        try {
            const streamerQueue = await getStreamerQueue(login)

            return streamerQueue
        } catch (error) {
            if (error instanceof Error) return rejectWithValue(error.message)

            return rejectWithValue('Unknown error')
        }
    },
    {
        condition: (_, { getState }) => {
            if (getState().streamerSongData.queue.status === 'loading') {
                return false
            }
        },
    },
)
