import { Route, Routes } from 'react-router-dom'
import { History } from './history'
import { Queue } from './queue'
import { TopDjs } from './top-djs'
import { TopSongs } from './top-songs'

export const SongList = () => {
    return (
        <Routes>
            <Route path="/" element={<Queue />} />
            <Route path="/h" element={<History />} />
            <Route path="/top/djs" element={<TopDjs />} />
            <Route path="/top/songs" element={<TopSongs />} />
        </Routes>
    )
}
