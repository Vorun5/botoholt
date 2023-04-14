import { createAsyncThunk } from '@reduxjs/toolkit'
import { Streamer } from 'shared/types'
import { getAllStreamers } from '../../api'
import { sortStreamers } from '../../lib'
import { StreamersSlice } from '../type'

export const loadStreamers = createAsyncThunk<
    Streamer[],
    undefined,
    { state: { streamers: StreamersSlice }; rejectValue: string }
>(
    'streamers/load',
    async (_, { rejectWithValue }) => {
        try {
            const streamers = await getAllStreamers()

            return sortStreamers(streamers)
        } catch (error) {
            if (error instanceof Error) return rejectWithValue(error.message)
            
            return rejectWithValue('Unknown error')
        }
    },
    {
        condition: (_, { getState }) => {
            if (getState().streamers.status === 'loading') {
                return false
            }
        },
    },
)
