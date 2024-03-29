import { useMemo, useState } from 'react';
import { useStreamerQueueQuery } from 'entities/streamer-song-data';
import FeelsOkayMan from 'shared/assets/emotes/FeelsOkayMan.png';
import { HyperinkIcon } from 'shared/assets/icons';
import { formatTime } from 'shared/lib/helpers';
import { StreamerQueueSong } from 'shared/types';
import { ErrorMessage, Loading, SearchField, SongDataList, SongListItem } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { debounce } from 'underscore';

import { getNewSongListSearchParams, getYtPlaylistLink } from '../lib';
import { ListStatusNotification } from './list-status-notification/list-status-notification';
import { SongListProps } from './song-list';

export const Queue = ({ login, searchStr }: Pick<SongListProps, 'login' | 'searchStr'>) => {
    const { t } = useTranslation()
    const [_, setSearchParams] = useSearchParams()
    const { data: queue, isSuccess, isLoading, isError, fetchStatus } = useStreamerQueueQuery(login.toLowerCase())
    const [queueList, setQueueList] = useState<StreamerQueueSong[]>(isSuccess ? queue.queue : [])

    useMemo(() => {
        if (!isSuccess) return
        setQueueList(
            queue.queue.filter(
                (song) =>
                    song.name.toLowerCase().includes(searchStr.toLowerCase()) ||
                    song.sender.toLowerCase().includes(searchStr.toLowerCase()),
            ),
        )
    }, [queue, searchStr])

    const time = useMemo(() => {
        let queueTime = -1
        if (!isSuccess) return queueTime
        if (queue.queue.length !== 0) {
            queueTime = queue.queue
                .map((song) => song.durationInSeconds - song.startFromInSeconds)
                .reduce((accumulator, songDuration) => accumulator + songDuration)
        }
        return queueTime
    }, [queue])

    const ytPlaylistLink = getYtPlaylistLink(queueList.map((song) => song.link))

    const onChangeSearchStr = debounce((str: string) => {
        setSearchParams(getNewSongListSearchParams({ searchStr: str }))
    }, 200)

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
                        {time !== -1 ? ` ~${formatTime(time, t)}` : ''}
                    </>
                }
            >
                <SearchField defaultValue={searchStr} onChange={onChangeSearchStr} />
                {isLoading && <Loading />}
                {isError && <ErrorMessage>{`Error status: ${fetchStatus}`}</ErrorMessage>}
                {isSuccess && queue.queue.length === 0 && (
                    <ListStatusNotification
                        emote={FeelsOkayMan}
                        altEmote="FeelsOkayMan"
                        title={t('streamer-page.list-is-empty.queue')}
                        text={t('streamer-page.list-is-empty.first')}
                    />
                )}
                {isSuccess &&
                    queueList.map((song) => (
                        <SongListItem
                            key={song.id}
                            songName={song.name}
                            songLink={song.link}
                            sender={song.sender}
                            number={queue.queue.findIndex((i) => i === song) + 1}
                            extraInfo={formatTime(song.durationInSeconds - song.startFromInSeconds, t)}
                        />
                    ))}
            </SongDataList>
        </>
    )
}
