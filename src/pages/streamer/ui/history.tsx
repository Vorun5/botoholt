import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { SONG_LIMIT, loadStreamerHistorySongs, selectStreamerHistorySongs } from 'entities/streamer-song-data'
import FeelsOkayMan from 'shared/assets/emotes/FeelsOkayMan.png'
import { capitalize } from 'shared/lib/helpers'
import { useInterval } from 'shared/lib/hooks'
import i18n from 'shared/lib/i18n/i18n'
import { useAppDispatch } from 'shared/lib/store'
import { StreamerHistorySong } from 'shared/types'
import { ErrorMessage, Loading, Pagination } from 'shared/ui'
import { SongDataList, SongListItem } from 'shared/ui/song-data-list'
import { ListStatusNotification } from './list-status-notification/list-status-notification'

export const History = () => {
    const { t } = useTranslation()
    const history = useSelector(selectStreamerHistorySongs)

    // TODO: move search logic to redux
    const [historyList, setHistoryList] = useState<StreamerHistorySong[]>(history.list)
    const [searchStr, setSearchStr] = useState('')
    const [from, setFrom] = useState(0)

    const search = (str: string) => {
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
        setHistoryList(history.list)
        search(searchStr)
    }, [history])

    const { streamerName } = useParams()
    const login = streamerName || ''
    useEffect(() => {
        dispatch(loadStreamerHistorySongs({ login: login, limit: SONG_LIMIT, from: from }))
    }, [from])

    const dispatch = useAppDispatch()
    const updateInfo = useCallback(() => {
        console.log('Update history')
    }, [dispatch])
    useInterval(updateInfo)

    const changePage = (page: number) => {
        setFrom((page - 1) * SONG_LIMIT)
    }

    return (
        <>
            <SongDataList title={t('streamer-page.tab-titles.history')} searchFun={search}>
                {history.status === 'loading' && <Loading />}
                {history.status === 'rejected' && <ErrorMessage>{history.error}</ErrorMessage>}
                {history.status === 'received' && history.list.length === 0 && (
                    <ListStatusNotification
                        emote={FeelsOkayMan}
                        altEmote="FeelsOkayMan"
                        title={t('streamer-page.list-is-empty.history')}
                        text={t('streamer-page.list-is-empty.fix')}
                    />
                )}
                {history.status === 'received' && (
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

                            return (
                                <SongListItem
                                    key={index + 1 + history.from}
                                    songName={song.name}
                                    songLink={song.link}
                                    sender={song.sender}
                                    number={index + 1 + history.from}
                                    extraInfo={`${formatDateTime} ${capitalize(formatDateWeek)}`}
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
