import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { loadStreamerQueue, selectStreamerQueue } from 'entities/streamer-song-data'
import FeelsOkayMan from 'shared/assets/emotes/FeelsOkayMan.png'
import { HyperinkIcon } from 'shared/assets/icons'
import { formatTime } from 'shared/lib/helpers'
import { useInterval } from 'shared/lib/hooks'
import { useAppDispatch } from 'shared/lib/store'
import { StreamerQueueSong } from 'shared/types'
import { ErrorMessage, Loading, SongDataList, SongListItem } from 'shared/ui'
import { getYtPlaylistLink } from '../lib'
import { ListStatusNotification } from './list-status-notification/list-status-notification'

export const Queue = () => {
    const { t } = useTranslation()
    const queue = useSelector(selectStreamerQueue)
    const [queueList, setQueueList] = useState<StreamerQueueSong[]>(queue.list)
    const [searchStr, setSearchStr] = useState('')

    useMemo(() => {
        setQueueList(
            queue.list.filter(
                (song) =>
                    song.name.toLowerCase().includes(searchStr.toLowerCase()) ||
                    song.sender.toLowerCase().includes(searchStr.toLowerCase()),
            ),
        )
    }, [queue.list, searchStr])

    const { streamerName } = useParams()
    const login = streamerName || ''
    const dispatch = useAppDispatch()

    const updateInfo = useCallback(() => {
        dispatch(loadStreamerQueue(login))
    }, [])

    useInterval(updateInfo)

    let queueTime = -1
    if (queue.list.length !== 0) {
        queueTime = queue.list
            .map((song) => song.durationInSeconds - song.startFromInSeconds)
            .reduce((accumulator, songDuration) => accumulator + songDuration)
    }

    const ytPlaylistLink = getYtPlaylistLink(queueList.map((song) => song.link))

    return (
        <>
            <SongDataList
                title={
                    <>
                        {ytPlaylistLink !== null ? (
                            <a
                                target="_blank"
                                href={ytPlaylistLink}
                                style={{
                                    marginRight: '10px',
                                }}
                            >
                                {t('streamer-page.tab-titles.queue')} <HyperinkIcon />
                            </a>
                        ) : (
                            t('streamer-page.tab-titles.queue')
                        )}
                        {queueTime !== -1
                            ? ` ~${Math.floor(queueTime / 60)}${t('minutes')} ${queueTime % 60}${t('seconds')}`
                            : ''}
                    </>
                }
                searchFun={(str) => setSearchStr(str)}
            >
                {queue.status === 'loading' && <Loading />}
                {queue.status === 'rejected' && <ErrorMessage>{queue.error}</ErrorMessage>}
                {queue.status === 'received' && queue.list.length === 0 && (
                    <ListStatusNotification
                        emote={FeelsOkayMan}
                        altEmote="FeelsOkayMan"
                        title={t('streamer-page.list-is-empty.queue')}
                        text={t('streamer-page.list-is-empty.first')}
                    />
                )}
                {queue.status === 'received' &&
                    queueList.map((song) => (
                        <SongListItem
                            key={song.id}
                            songName={song.name}
                            songLink={song.link}
                            sender={song.sender}
                            number={queue.list.findIndex((i) => i === song) + 1}
                            extraInfo={formatTime(song.durationInSeconds - song.startFromInSeconds, t)}
                        />
                    ))}
            </SongDataList>
        </>
    )
}
