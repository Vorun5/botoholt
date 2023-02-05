import styles from './StreamerLists.module.css'
import { TopListProps } from './TopList.props'
import SearchField from 'components/SearchField/SearchField'
import useTopListItemSearch from 'hooks/useTopListItemSearch'
import TopItem from 'components/StreamerListItems/TopItem'
import Bloc from 'components/Bloc/Bloc'
import Loading from 'components/Loading/Loading'

const TopList = ({
    title,
    items,
    loading = false,
    listIsEmpty = false,
    emptyCard = null,
}: TopListProps) => {
    const { search, setSearch, topItems } = useTopListItemSearch(items)

    return (
        <>
            <div className={styles.header}>
                <div className={styles.header__title}>{title}</div>
                <Bloc height="16px" />
                {!listIsEmpty && (
                    <SearchField value={search} setValue={setSearch} />
                )}
            </div>
            {loading ? (
                <Loading />
            ) : listIsEmpty ? (
                emptyCard
            ) : (
                topItems.map((item) => (
                    <TopItem key={item.number} topItem={item} />
                ))
            )}
        </>
    )
}

export default TopList
