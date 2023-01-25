import styles from "./StreamerLists.module.css";
import SearchField from "../SearchField/SearchField";
import TopListItem from "../../models/TopListItem";
import useTopListItemSearch from "../../hooks/useTopListItemSearch";
import TopItem from "../StreamerListItems/TopItem";
import Bloc from "../Bloc/Bloc";

interface TopListProps {
    title: string;
    items: TopListItem[];
}

const TopList = ({title, items}: TopListProps) => {
    const {search, setSearch, topItems} = useTopListItemSearch(items);

    return (
        <>
            <div className={styles.header}>
                <div className={styles.header__title}>{title}</div>
                <Bloc height="16px"/>
                <SearchField value={search} setValue={setSearch}/>
            </div>
            {topItems.map((item) => <TopItem key={item.number} topItem={item}/>)}
        </>
    );
}

export default TopList;
