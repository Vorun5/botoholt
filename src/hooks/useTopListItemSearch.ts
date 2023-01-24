import {useEffect, useState} from "react";
import TopListItem from "../models/TopListItem";


const useTopListItemSearch = (items: TopListItem[]) => {
    const [search, setSearch] = useState("");
    const [songs, setSongs] = useState(items);

    useEffect(() => {
        setSongs(items.filter(item => item.text.includes(search)));
    }, [search, items]);

    return {search, setSearch, songs};
}

export default useTopListItemSearch;
