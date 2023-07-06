import { RootState } from 'shared/lib/store'

export const selectCommands = (state: RootState) => ({ ...state.commands })
