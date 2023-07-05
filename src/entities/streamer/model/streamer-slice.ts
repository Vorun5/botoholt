import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initial-state'
import { loadStreamer } from './thunks'

const streamerSlice = createSlice({
    name: 'streamer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadStreamer.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(loadStreamer.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload || 'Cannot load streamer'
            })
            .addCase(loadStreamer.fulfilled, (state, action) => {
                state.status = 'received'
                state.streamer = action.payload
            })
    },
})

export const streamerReducer = streamerSlice.reducer
