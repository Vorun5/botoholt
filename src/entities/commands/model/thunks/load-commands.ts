import { createAsyncThunk } from '@reduxjs/toolkit'
import { getCommands } from 'entities/commands/api'
import { Commands } from 'shared/types'
import { CommandsSlice } from '../type'

export const loadCommands = createAsyncThunk<
    Commands,
    undefined,
    { state: { commands: CommandsSlice }; rejectValue: string }
>(
    'commands/load',
    async (_, { rejectWithValue }) => {
        try {
            const commands = await getCommands()

            return commands
        } catch (error) {
            if (error instanceof Error) return rejectWithValue(error.message)

            return rejectWithValue('Unknown error')
        }
    },
    {
        condition: (_, { getState }) => {
            if (getState().commands.status === 'loading') {
                return false
            }
        },
    },
)
