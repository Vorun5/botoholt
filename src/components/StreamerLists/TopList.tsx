import styles from "./StreamerLists.module.css";
import SearchField from "../SearchField/SearchField";
import TopListItem from "../../models/TopListItem";
import useTopListItemSearch from "../../hooks/useTopListItemSearch";
import TopItem from "../StreamerListItems/TopItem";
import Bloc from "../Bloc/Bloc";
import Loading from "../Loading/Loading";
import {ReactNode} from "react";

interface TopListProps {
    loading?: boolean;
    listIsEmpty?: boolean;
    title: string;
    items: TopListItem[];
    emptyCard?: ReactNode;
}

const TopList = ({title, items, loading = false, listIsEmpty = false, emptyCard = null}: TopListProps) => {
    const {search, setSearch, topItems} = useTopListItemSearch(items);

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
                    : topItems.map((item) => <TopItem key={item.number} topItem={item}/>))
            }
        </>
    );
}

export default TopList;
