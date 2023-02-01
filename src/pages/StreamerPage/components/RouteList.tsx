import styles from "../StreamerPage.module.css";
import {Route, Routes} from "react-router-dom";
import QueueList from "../../../components/StreamerLists/QueueList";
import HistoryList from "../../../components/StreamerLists/HistoryList";
import TopDJs from "../../../components/StreamerLists/TopDJs";
import TopSongList from "../../../components/StreamerLists/TopSongs";
import {Period} from "../../../types";
import {Streamer} from "../../../models/Streamer";
import {QueueSong} from "../../../models/QueueSong";

interface RouteListProps {
    streamer: Streamer;
    queueIsEmpty: boolean;
    queue: QueueSong[];
    period: Period;
}

const RouteList = ({queue, queueIsEmpty, period, streamer}: RouteListProps) =>
    <div className={styles.main__list}>
        <Routes>
            <Route path="/" element={<QueueList queueIsEmpty={queueIsEmpty} items={queue}/>}/>
            <Route path="/h" element={<HistoryList streamerLogin={streamer.login}/>}/>
            <Route path="/top/djs" element={<TopDJs streamerLogin={streamer.login} period={period}/>}/>
            <Route path="/top/songs" element={<TopSongList streamerLogin={streamer.login} period={period}/>}/>
        </Routes>
    </div>;

export default RouteList;
