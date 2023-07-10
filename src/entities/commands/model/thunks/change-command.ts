import { createAsyncThunk } from '@reduxjs/toolkit'
import { setCommand } from 'entities/commands/api'
import { AllPossibleCommandType } from 'shared/types'
import { CommandsSlice } from '../type'

export const changeCommand = createAsyncThunk<
    AllPossibleCommandType,
    AllPossibleCommandType,
    { state: { commands: CommandsSlice }; rejectValue: string }
>(
    'commands/change',
    async (command, { rejectWithValue }) => {
        try {
            const commands = await setCommand(command)

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
