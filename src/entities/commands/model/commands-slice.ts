import { createSlice } from '@reduxjs/toolkit'
import { loadCommands } from './thunks'
import { CommandsSlice } from './type'

const initialState: CommandsSlice = {
    status: 'idle',
    error: null,
    commands: [],
}

const commandsSlice = createSlice({
    name: 'commands',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCommands.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(loadCommands.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload || 'Cannot load commands'
            })
            .addCase(loadCommands.fulfilled, (state, action) => {
                state.status = 'received'
                state.commands = action.payload
            })
    },
})

export const commandsReducer = commandsSlice.reducer
