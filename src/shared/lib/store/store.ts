import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { adminAuthReducer } from 'entities/admin-auth'
import { streamerReducer } from 'entities/streamer'
import { streamerSongDataReducer } from 'entities/streamer-song-data'
import { streamersReducer } from 'entities/streamers'

export const store = configureStore({
    reducer: {
        streamers: streamersReducer,
        streamerSongData: streamerSongDataReducer,
        adminAuth: adminAuthReducer,
        streamer: streamerReducer,
    },
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
