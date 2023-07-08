import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { SONG_LIMIT, selectStreamerTopSongs } from 'entities/streamer-song-data'
import INSANECAT from 'shared/assets/emotes/INSANECAT.gif'
import { HyperinkIcon } from 'shared/assets/icons'
import { Period } from 'shared/types'
import { ErrorMessage, Loading, Pagination, SongDataList } from 'shared/ui'
import { TopListItem } from 'shared/ui'
import { getYtPlaylistLink } from '../lib'
import { ListStatusNotification } from './list-status-notification/list-status-notification'

export const TopSongs = ({ period }: { period: Period }) => {
    const { t } = useTranslation()
    const [_, setSearchParams] = useSearchParams()
    const topSongs = useSelector(selectStreamerTopSongs)
    const total = Math.ceil(topSongs.total / SONG_LIMIT)
    const [topSongsList, setTopSongsList] = useState(topSongs.list)
    const ytPlaylistLink = getYtPlaylistLink(topSongsList.map((song) => song.link))
    const [searchStr, setSearchStr] = useState('')
    const ref = useRef<HTMLDivElement>(null)

    const search = (str: string) => {
        setSearchStr(str)
        setTopSongsList(topSongs.list.filter((song) => song.name.toLowerCase().includes(str.toLowerCase())))
    }

    useEffect(() => {
        setTopSongsList(topSongs.list)
        search(searchStr)
    }, [topSongs])

    const changePage = (page: number) => {
        window.scrollTo(0, ref.current!.offsetTop - 20)
        setSearchParams({ period: period, page: page.toString() })
    }

    return (
        <>
            <div ref={ref} />
            <SongDataList
                title={
                    ytPlaylistLink !== null ? (
                        <a target="_blank" href={ytPlaylistLink}>
                            {t('streamer-page.tab-titles.top-songs')} <HyperinkIcon />
                        </a>
                    ) : (
                        t('streamer-page.tab-titles.top-songs')
                    )
                }
                searchFun={search}
            >
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
                {topSongs.status === 'received' && (
                    <>
                        {topSongsList.map((song, index) => (
                            <TopListItem
                                key={index + 1 + topSongs.from}
                                extraInfo={song.amount.toString()}
                                link={song.link}
                                text={song.name}
                                number={topSongs.list.findIndex((i) => i === song) + 1 + topSongs.from}
                            />
                        ))}
                        <Pagination total={total} page={topSongs.from / SONG_LIMIT + 1} changePage={changePage} />
                    </>
                )}
            </SongDataList>
        </>
    )
}
