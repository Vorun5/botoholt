import styles from "./StreamerLists.module.css";
import useSongListItemSearch from "../../hooks/useSongListItemSearch";
import SearchField from "../SearchField/SearchField";
import SongItem from "../StreamerListItems/SongItem";
import SongListItem from "../../models/SongListItem";
import Bloc from "../Bloc/Bloc";
import Loading from "../Loading/Loading";

interface SongListProps {
    loading: boolean;
    title: string;
    items: SongListItem[];
}

const SongList = ({items, title, loading}: SongListProps) => {
    const {search, setSearch, songs} = useSongListItemSearch(items);

    return (
        <>
            <div className={styles.header}>
                <div className={styles.header__title}>{title}</div>
                <Bloc height="16px"/>
                <SearchField value={search} setValue={setSearch}/>
            </div>
            {loading ? <Loading/> : songs.map((song) => <SongItem key={song.number} song={song}/>)}
        </>
    );
}

export default SongList;
