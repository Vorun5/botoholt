import { Route, Routes } from 'react-router-dom'
import { Period } from 'shared/types'
import { History } from './history'
import { Queue } from './queue'
import { TopDjs } from './top-djs'
import { TopSongs } from './top-songs'

interface SongListProps {
    streamerName: string
    period: Period
}

export const SongList = ({ period, streamerName }: SongListProps) => {
    return (
        <Routes>
            <Route path="/" element={<Queue />} />
            <Route path="/h" element={<History streamerName={streamerName} />} />
            <Route path="/top/djs" element={<TopDjs period={period} />} />
            <Route path="/top/songs" element={<TopSongs period={period} />} />
        </Routes>
    )
}
