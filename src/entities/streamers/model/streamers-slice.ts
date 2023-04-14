import { createSlice } from '@reduxjs/toolkit'
import { loadStreamers } from './thunks'
import { StreamersSlice } from './type'

const initialState: StreamersSlice = {
    status: 'idle',
    error: null,
    list: [],
}

const streamersSlice = createSlice({
    name: 'streamers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadStreamers.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(loadStreamers.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload || 'Cannot load streamers'
            })
            .addCase(loadStreamers.fulfilled, (state, action) => {
                state.status = 'received'
                state.list = action.payload
            })
    },
})

export const streamersReducer = streamersSlice.reducer
