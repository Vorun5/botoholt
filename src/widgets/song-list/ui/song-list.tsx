import { Period } from 'shared/types'
import { Route, Routes } from 'react-router-dom'

import { History } from './history/history'
import { StreamerPageTab } from './song-list-navigation/song-list-navigation'
import { Queue } from './queue'
import { TopDjs } from './top-djs'
import { TopSongs } from './top-songs'

export interface SongListProps {
    login: string
    tab: StreamerPageTab
    period: Period
    page: number
    limit: number
    searchStr: string
    searchType: 'name' | 'sender'
}

export const SongList = (props: SongListProps) => {
    return (
        <Routes>
            <Route path="/" element={<Queue {...props} />} />
            <Route path="/h" element={<History {...props} />} />
            <Route path="/top/djs" element={<TopDjs {...props} />} />
            <Route path="/top/songs" element={<TopSongs {...props} />} />
        </Routes>
    )
}
