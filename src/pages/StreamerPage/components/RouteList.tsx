import styles from '../StreamerPage.module.css'
import { RouteListProps } from './RouteList.props'
import HistoryList from 'components/StreamerLists/HistoryList'
import QueueList from 'components/StreamerLists/QueueList'
import TopDJs from 'components/StreamerLists/TopDJs'
import TopSongList from 'components/StreamerLists/TopSongs'
import { Route, Routes } from 'react-router-dom'

const RouteList = ({ queue, queueIsEmpty, period, streamer }: RouteListProps) => (
    <div className={styles.main__list}>
        <Routes>
            <Route path='/' element={<QueueList queueIsEmpty={queueIsEmpty} items={queue} />} />
            <Route path='/h' element={<HistoryList streamerLogin={streamer.login} />} />
            <Route
                path='/top/djs'
                element={<TopDJs streamerLogin={streamer.login} period={period} />}
            />
            <Route
                path='/top/songs'
                element={<TopSongList streamerLogin={streamer.login} period={period} />}
            />
        </Routes>
    </div>
)

export default RouteList
