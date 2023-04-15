import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectStreamerQueue } from 'entities/streamer-song-data'
import { StreamerQueueSong } from 'shared/types'
import { ErrorMessage, Loading, SongDataList, SongListItem } from 'shared/ui'

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

    return (
        <>
            <SongDataList title="Queue" searchFun={search}>
                {queue.status === 'loading' && <Loading />}
                {queue.status === 'rejected' && <ErrorMessage>{queue.error}</ErrorMessage>}
                {queue.status === 'received' &&
                    queueList.map((song, index) => (
                        <SongListItem
                            key={song.id}
                            songName={song.name}
                            songLink={song.link}
                            sender={song.sender}
                            number={index + 1}
                            extraInfo={`${Math.floor(song.durationInSeconds! / 60)}${t('minutes')} 
                                      ${song.durationInSeconds! % 60}${t('seconds')}`}
                        />
                    ))}
            </SongDataList>
        </>
    )
}
