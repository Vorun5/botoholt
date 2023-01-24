import useSongListItemSearch from "../../hooks/useSongListItemSearch";
import {QueueSong} from "../../models/QueueSong";
import SearchField from "../SearchField/SearchField";

interface QueueListProps {
    items: QueueSong[];
}

const QueueList = ({items}: QueueListProps) => {
    const {search, setSearch, songs} = useSongListItemSearch(items.map((item) => {
        return {
            mediaName: item.mediaName,
            mediaLink: item.mediaLink,
            requestedBy: item.requestedBy,
            number: item.mediaId,
            extraText: item.duration.toString(),
        }
    }));

    return (
        <>
            <div>Title</div>
            <SearchField value={search} setValue={setSearch}/>
            <div>
                {songs.map((song) => <div key={song.number}>{song.mediaName}</div>)}
            </div>
        </>);
}

export default QueueList;
