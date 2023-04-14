import { RootState } from 'shared/lib/store'

export const selectStreamers = (state: RootState) => ({ ...state.streamers })
