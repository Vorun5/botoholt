import { Period } from 'shared/types'
import { Route, Routes } from 'react-router-dom'

import { StreamerPageTab } from '../lib'
import { History } from './history/history'
import { Queue } from './queue'
import { TopDjs } from './top-djs'
import { TopSongs } from './top-songs'

interface SongListProps {
    streamerName: string
    tab: StreamerPageTab
    period: Period
    from: number
}

export const SongList = ({ period, streamerName, from }: SongListProps) => {
    const login = streamerName.toLocaleLowerCase()
    
    return (
        <Routes>
            <Route path="/" element={<Queue login={login} />} />
            <Route path="/h" element={<History login={streamerName} from={from} />} />
            <Route path="/top/djs" element={<TopDjs period={period} from={from} login={login} />} />
            <Route path="/top/songs" element={<TopSongs period={period} from={from} login={login} />} />
        </Routes>
    )
}
