import styles from "./StreamerLists.module.css";
import useSongListItemSearch from "../../hooks/useSongListItemSearch";
import SearchField from "../SearchField/SearchField";
import SongItem from "../StreamerListItems/SongItem";
import SongListItem from "../../models/SongListItem";

interface SongListProps {
    title: string;
    items: SongListItem[];
}

const SongList = ({items, title}: SongListProps) => {
    const {search, setSearch, songs} = useSongListItemSearch(items);

    return (
        <>
            <div className={styles.title}>{title}</div>
            <div className={styles.search}>
                <SearchField value={search} setValue={setSearch}/>
            </div>
            {songs.map((song) => <SongItem key={song.number} song={song}/>)}
        </>
    );
}

export default SongList;
