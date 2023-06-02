import { Route, Routes } from 'react-router-dom'
import { Period } from 'shared/types'
import { History } from './history'
import { Queue } from './queue'
import { TopDjs } from './top-djs'
import { TopSongs } from './top-songs'

export const SongList = ({ period }: { period: Period }) => {
    return (
        <Routes>
            <Route path="/" element={<Queue />} />
            <Route path="/h" element={<History />} />
            <Route path="/top/djs" element={<TopDjs period={period} />} />
            <Route path="/top/songs" element={<TopSongs period={period} />} />
        </Routes>
    )
}
