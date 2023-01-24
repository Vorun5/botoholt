import styles from "./QueueList.module.css";
import useSongListItemSearch from "../../hooks/useSongListItemSearch";
import {QueueSong} from "../../models/QueueSong";
import SearchField from "../SearchField/SearchField";
import SongItem from "../ListItems/SongItem";
import {formatTime} from "../../utils";
import {useTranslation} from "react-i18next";

interface QueueListProps {
    items: QueueSong[];
}

const QueueList = ({items}: QueueListProps) => {
    const {t} = useTranslation();

    const {search, setSearch, songs} = useSongListItemSearch(items.map((item, index) => {
        return {
            mediaName: item.mediaName,
            mediaLink: item.mediaLink,
            requestedBy: item.requestedBy,
            number: index + 1,
            extraText: formatTime(item.duration, t),
        }
    }));

    return (
        <>
            <div className={styles.title}>Title</div>
            <div className={styles.search}>
                <SearchField value={search} setValue={setSearch}/>
            </div>
            {songs.map((song) => <SongItem key={song.number} song={song}/>)}
        </>
    );
}

export default QueueList;
