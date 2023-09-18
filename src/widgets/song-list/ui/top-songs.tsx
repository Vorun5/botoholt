import { useRef } from 'react'
import { SONG_LIMIT, useStreamerTopSongQuery } from 'entities/streamer-song-data'
import INSANECAT from 'shared/assets/emotes/INSANECAT.gif'
import { HyperinkIcon } from 'shared/assets/icons'
import { ErrorMessage, Loading, Pagination, SearchField, SongDataList } from 'shared/ui'
import { TopListItem } from 'shared/ui'
import { nanoid } from 'nanoid'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { debounce } from 'underscore'

import { getYtPlaylistLink } from '../lib'
import { ListStatusNotification } from './list-status-notification/list-status-notification'
import { SongListProps } from './song-list'

export const TopSongs = ({
    login,
    period,
    page,
    limit,
    searchStr,
}: Pick<SongListProps, 'period' | 'login' | 'page' | 'limit' | 'searchStr'>) => {
    const { t } = useTranslation()
    const [_, setSearchParams] = useSearchParams()

    const {
        data: topSongs,
        isLoading,
        isError,
        isSuccess,
        fetchStatus,
    } = useStreamerTopSongQuery({
        login,
        from: page * limit,
        period,
        limit: limit,
        name: searchStr,
    })
    const ytPlaylistLink = getYtPlaylistLink(isSuccess ? topSongs.list.map((song) => song.link) : [])

    const ref = useRef<HTMLDivElement>(null)

    const handlerSearchByName = debounce((name: string) => {}, 1000)

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
            >
                <SearchField onChange={handlerSearchByName} />
                {isLoading && <Loading />}
                {isError && <ErrorMessage>{`Error status: ${fetchStatus}`}</ErrorMessage>}
                {isSuccess && topSongs.list.length === 0 && (
                    <ListStatusNotification
                        emote={INSANECAT}
                        altEmote="INSANECAT"
                        title={t('streamer-page.list-is-empty.top-songs')}
                        text={t('streamer-page.list-is-empty.fix')}
                    />
                )}
                {isSuccess && (
                    <>
                        {topSongs.list.map((song, index) => (
                            <TopListItem
                                key={nanoid()}
                                extraInfo={song.amount.toString()}
                                link={song.link}
                                text={song.name}
                                number={topSongs.list.findIndex((i) => i === song) + 1 + topSongs.from}
                            />
                        ))}
                        <Pagination
                            total={Math.ceil(topSongs.total / SONG_LIMIT)}
                            page={topSongs.from / SONG_LIMIT + 1}
                            changePage={changePage}
                        />
                    </>
                )}
            </SongDataList>
        </>
    )
}
