import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { loadStreamerQueue, selectStreamerQueue } from 'entities/streamer-song-data'
import FeelsOkayMan from 'shared/assets/emotes/FeelsOkayMan.png'
import { useInterval } from 'shared/lib/hooks'
import { useAppDispatch } from 'shared/lib/store'
import { StreamerQueueSong } from 'shared/types'
import { ErrorMessage, Loading, SongDataList, SongListItem } from 'shared/ui'
import { ListStatusNotification } from './list-status-notification/list-status-notification'
import { HyperinkIcon } from 'shared/assets/icons'

export const Queue = () => {
    const { t } = useTranslation()
    const queue = useSelector(selectStreamerQueue)

    // TODO: move search logic to redux
    const [queueList, setQueueList] = useState<StreamerQueueSong[]>(queue.list)
    const [searchStr, setSearchStr] = useState('')

    const search = (str: string) => {
        setSearchStr(str)
        setQueueList(
            queue.list.filter(
                (song) =>
                    song.name.toLowerCase().includes(str.toLowerCase()) ||
                    song.sender.toLowerCase().includes(str.toLowerCase()),
            ),
        )
    }

    useEffect(() => {
        setQueueList(queue.list)
        search(searchStr)
    }, [queue])

    const { streamerName } = useParams()
    const login = streamerName || ''
    const dispatch = useAppDispatch()
    const updateInfo = useCallback(() => {
        console.log('Update queue')
        dispatch(loadStreamerQueue(login))
    }, [dispatch])
    useInterval(updateInfo)

    let queueTime = -1
    if (queue.list.length !== 0) {
        queueTime = queue.list
            .map((song) => song.durationInSeconds - song.startFromInSeconds)
            .reduce((accumulator, songDuration) => accumulator + songDuration)
    }

    let ytPlaylistLink = ''
    if (queueList.length !== 0) {
        for (const song of queueList) {
            const url = new URL(song.link)
            const id = url.searchParams.get('v')
            if (id !== null) {
                ytPlaylistLink = ytPlaylistLink + id + ','
            }
        }
        if (ytPlaylistLink.length !== 0) {
            ytPlaylistLink = 'https://www.youtube.com/watch_videos?video_ids=' + ytPlaylistLink.slice(0, -1)
        }
    }

    return (
        <>
            <SongDataList
                title={
                    <>
                        {ytPlaylistLink.length !== 0 ? (
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
                searchFun={search}
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
                            extraInfo={`${Math.floor(song.durationInSeconds! / 60)}${t('minutes')} 
                                      ${song.durationInSeconds! % 60}${t('seconds')}`}
                        />
                    ))}
            </SongDataList>
        </>
    )
}
