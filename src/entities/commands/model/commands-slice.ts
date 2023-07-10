import { createSlice } from '@reduxjs/toolkit'
import { changeCommand, loadCommands } from './thunks'
import { CommandsSlice } from './type'

const initialState: CommandsSlice = {
    status: 'idle',
    error: null,
    commands: [],
    commandСhange: {
        status: 'idle',
        error: null,
    },
}

const commandsSlice = createSlice({
    name: 'commands',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // load commands
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
            // change command
            .addCase(changeCommand.pending, (state) => {
                state.commandСhange.status = 'loading'
                state.commandСhange.error = null
            })
            .addCase(changeCommand.rejected, (state, action) => {
                state.commandСhange.status = 'rejected'
                state.commandСhange.error = action.payload || 'Cannot change command'
            })
            .addCase(changeCommand.fulfilled, (state, action) => {
                if (state.error) {
                    state.commandСhange.status = 'rejected'
                    state.commandСhange.error =
                        'Unable to change command because an error occurred while loading commands'
                    return
                }
                state.commandСhange.status = 'received'
                state.commands = state.commands.map((command) => {
                    if (command.function === action.payload.function) return action.payload
                    return command
                })
            })
    },
})

export const commandsReducer = commandsSlice.reducer
