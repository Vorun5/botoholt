import styles from './StreamerLists.module.css'
import { TopListProps } from './TopList.props'
import Bloc from 'components/Bloc/Bloc'
import Loading from 'components/Loading/Loading'
import SearchField from 'components/SearchField/SearchField'
import TopItem from 'components/StreamerListItems/TopItem'
import useTopListItemSearch from 'hooks/useTopListItemSearch'

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
                <Bloc height='16px' />
                {!listIsEmpty && <SearchField value={search} setValue={setSearch} />}
            </div>
            {loading ? (
                <Loading />
            ) : listIsEmpty ? (
                emptyCard
            ) : (
                topItems.map((item) => <TopItem key={item.number} topItem={item} />)
            )}
        </>
    )
}

export default TopList
