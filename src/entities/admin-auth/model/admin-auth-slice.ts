import { createSlice } from '@reduxjs/toolkit'
import { loadAuthData } from './thunks'
import { AdminAuthSlice } from './type'

const initialState: AdminAuthSlice = {
    status: 'idle',
    error: null,
    auth: null,
}

const AdminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadAuthData.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(loadAuthData.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload || 'Cannon load auth data'
            })
            .addCase(loadAuthData.fulfilled, (state, action) => {
                state.status = 'received'
                state.auth = action.payload
            })
    },
})

export const adminAuthReducer = AdminAuthSlice.reducer
