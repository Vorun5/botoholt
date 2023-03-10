import { SongListProps } from './SongList.props'
import styles from './StreamerLists.module.css'
import Bloc from 'components/Bloc/Bloc'
import Loading from 'components/Loading/Loading'
import SearchField from 'components/SearchField/SearchField'
import SongItem from 'components/StreamerListItems/SongItem'
import useSongListItemSearch from 'hooks/useSongListItemSearch'

const SongList = ({
    items,
    title,
    loading = false,
    listIsEmpty = true,
    emptyCard = null,
}: SongListProps) => {
    const { search, setSearch, songs } = useSongListItemSearch(items)

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
                songs.map((song) => <SongItem key={song.number} song={song} />)
            )}
        </>
    )
}

export default SongList
