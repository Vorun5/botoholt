import styles from "./StreamerLists.module.css";
import useSongListItemSearch from "../../hooks/useSongListItemSearch";
import SearchField from "../SearchField/SearchField";
import SongItem from "../StreamerListItems/SongItem";
import SongListItem from "../../models/SongListItem";
import Bloc from "../Bloc/Bloc";
import Loading from "../Loading/Loading";
import {ReactNode} from "react";

interface SongListProps {
    loading?: boolean;
    listIsEmpty?: boolean;
    title: string;
    items: SongListItem[];
    emptyCard?: ReactNode;
}

const SongList = ({items, title, loading = false, listIsEmpty = true, emptyCard = null}: SongListProps) => {
    const {search, setSearch, songs} = useSongListItemSearch(items);

    return (
        <>
            <div className={styles.header}>
                <div className={styles.header__title}>{title}</div>
                <Bloc height="16px"/>
                {!listIsEmpty ? <SearchField value={search} setValue={setSearch}/> : <></>}
            </div>
            {loading
                ? <Loading/>
                : (listIsEmpty
                    ? emptyCard
                    : songs.map((song) => <SongItem key={song.number} song={song}/>))
            }
        </>
    );
}

export default SongList;
