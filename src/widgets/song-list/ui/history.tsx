import { useEffect, useRef, useState } from 'react'
import { SONG_LIMIT, useStreamerHistoryQuery } from 'entities/streamer-song-data'
import FeelsOkayMan from 'shared/assets/emotes/FeelsOkayMan.png'
import { HyperinkIcon } from 'shared/assets/icons'
import { capitalize } from 'shared/lib/helpers'
import i18n from 'shared/lib/i18n/i18n'
import { StreamerHistorySong } from 'shared/types'
import { ErrorMessage, Loading, Pagination } from 'shared/ui'
import { SongDataList, SongListItem } from 'shared/ui/song-data-list'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { getYtPlaylistLink } from '../lib'
import { ListStatusNotification } from './list-status-notification/list-status-notification'

export const History = ({ login: streamerName, from }: { login: string; from: number }) => {
    const login = streamerName.toLocaleLowerCase()
    const { t } = useTranslation()
    const [_, setSearchParams] = useSearchParams()
    const {
        data: history,
        isSuccess,
        isLoading,
        isError,
        fetchStatus,
    } = useStreamerHistoryQuery({
        login,
        from: from,
        total: SONG_LIMIT,
    })

    const [historyList, setHistoryList] = useState<StreamerHistorySong[]>(isSuccess ? history.list : [])
    const ytPlaylistLink = getYtPlaylistLink(historyList.map((song) => song.link))
    const [searchStr, setSearchStr] = useState('')
    const ref = useRef<HTMLDivElement>(null)

    const search = (str: string) => {
        if (!isSuccess) return
        setSearchStr(str)
        setHistoryList(
            history.list.filter(
                (song) =>
                    song.name.toLowerCase().includes(str.toLowerCase()) ||
                    song.sender.toLowerCase().includes(str.toLowerCase()),
            ),
        )
    }

    useEffect(() => {
        if (!isSuccess) return
        setHistoryList(history.list)
        search(searchStr)
    }, [history])

    const changePage = (page: number) => {
        window.scrollTo(0, ref.current!.offsetTop - 20)
        setSearchParams({ page: page.toString() })
    }

    return (
        <>
            <div ref={ref} />
            <SongDataList
                title={
                    ytPlaylistLink !== null ? (
                        <a target="_blank" href={ytPlaylistLink}>
                            {t('streamer-page.tab-titles.history')} <HyperinkIcon />
                        </a>
                    ) : (
                        t('streamer-page.tab-titles.history')
                    )
                }
                searchFun={search}
            >
                {isLoading && <Loading />}
                {isError && <ErrorMessage>{`Error status: ${fetchStatus}`}</ErrorMessage>}
                {isSuccess && history.list.length === 0 && (
                    <ListStatusNotification
                        emote={FeelsOkayMan}
                        altEmote="FeelsOkayMan"
                        title={t('streamer-page.list-is-empty.history')}
                        text={t('streamer-page.list-is-empty.fix')}
                    />
                )}
                {isSuccess && (
                    <>
                        {historyList.map((song, index) => {
                            const date = new Date(song.date)
                            const formatDateWeek = new Intl.DateTimeFormat(i18n.language, {
                                weekday: 'short',
                            }).format(date)
                            const formatDateTime = new Intl.DateTimeFormat(i18n.language, {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: false,
                            }).format(date)
                            const formatDate = new Intl.DateTimeFormat(i18n.language).format(date)

                            return (
                                <SongListItem
                                    key={index + 1 + history.from}
                                    songName={song.name}
                                    songLink={song.link}
                                    sender={song.sender}
                                    number={history.list.findIndex((i) => i === song) + 1 + history.from}
                                    extraInfo={
                                        <>
                                            {`${formatDateTime} ${capitalize(formatDateWeek)}`}
                                            <br />
                                            {formatDate}
                                        </>
                                    }
                                />
                            )
                        })}
                        <Pagination
                            total={Math.ceil(history.total / SONG_LIMIT)}
                            page={history.from / SONG_LIMIT + 1}
                            changePage={changePage}
                        />
                    </>
                )}
            </SongDataList>
        </>
    )
}
