import {useEffect, useState} from "react";
import TopListItem from "../models/TopListItem";


const useTopListItemSearch = (listItems: TopListItem[]) => {
    const [search, setSearch] = useState("");
    const [items, setItems] = useState(listItems);

    useEffect(() => {
        setItems(listItems.filter(item => item.text.includes(search)));
    }, [search]);

    return {search, setSearch, items};
}

export default useTopListItemSearch;
