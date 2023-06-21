import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initial-state'
import { loadStreamer, loadStreamerQueue, loadStreamerTopDjs, loadStreamerTopSongs } from './thunks'
import { loadStreamerHistorySongs } from './thunks/load-streamer-history-songs'

const streamerSongDataSlice = createSlice({
    name: 'streamer-song-data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Streamer
            .addCase(loadStreamer.pending, (state) => {
                state.streamer.status = 'loading'
                state.streamer.error = null
            })
            .addCase(loadStreamer.rejected, (state, action) => {
                state.streamer.status = 'rejected'
                state.streamer.error = action.payload || 'Cannot load streamer'
            })
            .addCase(loadStreamer.fulfilled, (state, action) => {
                state.streamer.status = 'received'
                state.streamer.data = action.payload
            })
            // Queue
            .addCase(loadStreamerQueue.pending, (state) => {
                if (state.queue === initialState.queue) state.queue.status = 'loading'
                state.queue.error = null
            })
            .addCase(loadStreamerQueue.rejected, (state, action) => {
                state.queue.status = 'rejected'
                state.queue.error = action.payload || 'Cannot load streamer queue'
            })
            .addCase(loadStreamerQueue.fulfilled, (state, action) => {
                state.queue.status = 'received'
                state.queue.data = action.payload
            })
            // History
            .addCase(loadStreamerHistorySongs.pending, (state) => {
                if (state.history === initialState.history) state.history.status = 'loading'
                state.history.error = null
            })
            .addCase(loadStreamerHistorySongs.rejected, (state, action) => {
                state.history.status = 'rejected'
                state.history.error = action.payload || 'Cannot load streamer history'
            })
            .addCase(loadStreamerHistorySongs.fulfilled, (state, action) => {
                state.history.status = 'received'
                state.history.list = action.payload.list
                state.history.total = action.payload.total
                state.history.from = action.payload.from
            })
            // Top Djs
            .addCase(loadStreamerTopDjs.pending, (state) => {
                state.topDjs.status = 'loading'
                state.topDjs.error = null
            })
            .addCase(loadStreamerTopDjs.rejected, (state, action) => {
                state.topDjs.status = 'rejected'
                state.topDjs.error = action.payload || 'Cannot load streamer top djs'
            })
            .addCase(loadStreamerTopDjs.fulfilled, (state, action) => {
                state.topDjs.status = 'received'
                state.topDjs.list = action.payload.list
                state.topDjs.total = action.payload.total
                state.topDjs.from = action.payload.from
            })
            // Top songs
            .addCase(loadStreamerTopSongs.pending, (state) => {
                state.topSongs.status = 'loading'
                state.topSongs.error = null
            })
            .addCase(loadStreamerTopSongs.rejected, (state, action) => {
                state.topSongs.status = 'rejected'
                state.topSongs.error = action.payload || 'Cannot load streamer top songs'
            })
            .addCase(loadStreamerTopSongs.fulfilled, (state, action) => {
                state.topSongs.status = 'received'
                state.topSongs.list = action.payload.list
                state.topSongs.total = action.payload.total
                state.topSongs.from = action.payload.from
            })
    },
})

export const streamerSongDataReducer = streamerSongDataSlice.reducer
