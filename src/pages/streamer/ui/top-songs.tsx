import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectStreamerTopSongs } from 'entities/streamer-song-data'
import INSANECAT from 'shared/assets/emotes/INSANECAT.gif'
import { Period } from 'shared/types'
import { ErrorMessage, Loading, SongDataList } from 'shared/ui'
import { TopListItem } from 'shared/ui'
import { ListStatusNotification } from './list-status-notification/list-status-notification'

export const TopSongs = ({ period }: { period: Period }) => {
    const { t } = useTranslation()
    const topSongs = useSelector(selectStreamerTopSongs)

    // TODO: move search logic to redux
    const [topSongsList, setTopSongsList] = useState(topSongs.list)
    const [searchStr, setSearchStr] = useState('')

    const search = (str: string) => {
        setSearchStr(str)
        setTopSongsList(topSongs.list.filter((song) => song.name.toLowerCase().includes(str.toLowerCase())))
    }

    useEffect(() => {
        setTopSongsList(topSongs.list)
        search(searchStr)
    }, [topSongs])

    return (
        <>
            <SongDataList title={t('streamer-page.tab-titles.top-songs')} searchFun={search}>
                {topSongs.status === 'loading' && <Loading />}
                {topSongs.status === 'rejected' && <ErrorMessage>{topSongs.error}</ErrorMessage>}
                {topSongs.status === 'received' && topSongs.list.length === 0 && (
                    <ListStatusNotification
                        emote={INSANECAT}
                        altEmote="INSANECAT"
                        title={t('streamer-page.list-is-empty.top-songs')}
                        text={t('streamer-page.list-is-empty.fix')}
                    />
                )}
                {topSongs.status === 'received' &&
                    topSongsList.map((song) => (
                        <TopListItem
                            key={song.link}
                            extraInfo={song.amount.toString()}
                            link={song.link}
                            text={song.name}
                            number={topSongs.list.findIndex((i) => i === song) + 1}
                        />
                    ))}
            </SongDataList>
        </>
    )
}
