import { RootState } from 'shared/lib/store'

export const selectStreamer = (state: RootState) => ({ ...state.streamer })
