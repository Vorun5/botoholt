import { useRef, useState } from 'react'
import { SONG_LIMIT, useStreamerTopSongQuery } from 'entities/streamer-song-data'
import INSANECAT from 'shared/assets/emotes/INSANECAT.gif'
import { HyperinkIcon } from 'shared/assets/icons'
import { Period } from 'shared/types'
import { ErrorMessage, Loading, Pagination, SearchField, SongDataList } from 'shared/ui'
import { TopListItem } from 'shared/ui'
import { nanoid } from 'nanoid'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { debounce } from 'underscore'

import { getYtPlaylistLink } from '../lib'
import { ListStatusNotification } from './list-status-notification/list-status-notification'

export const TopSongs = ({ period, from, login }: { period: Period; login: string; from: number }) => {
    const { t } = useTranslation()
    const [_, setSearchParams] = useSearchParams()
    const [searchStr, setSearchStr] = useState('')

    const {
        data: topSongs,
        isLoading,
        isError,
        isSuccess,
        fetchStatus,
    } = useStreamerTopSongQuery({
        login,
        from,
        period,
        limit: SONG_LIMIT,
        name: searchStr,
    })
    const ytPlaylistLink = getYtPlaylistLink(isSuccess ? topSongs.list.map((song) => song.link) : [])

    const ref = useRef<HTMLDivElement>(null)

    const handlerSearchByName = debounce((name: string) => {
        if (from !== 0) {
            setSearchParams({ page: '1' })
        }
        setSearchStr(name)
    }, 1000)

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
