import {useEffect, useState} from "react";
import SongListItem from "../models/SongListItem";


const useSongListItemSearch = (items: SongListItem[]) => {
    const [search, setSearch] = useState("");
    const [songs, setItems] = useState(items);

    useEffect(() => {
        setItems(items.filter(item =>
            item.mediaName.toLowerCase().includes(search.toLowerCase())
            ||
            item.requestedBy.toLowerCase().includes(search.toLowerCase()))
        );
    }, [search]);

    return {search, setSearch, songs};
}

export default useSongListItemSearch;
