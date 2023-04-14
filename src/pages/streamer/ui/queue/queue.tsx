import { useSelector } from 'react-redux'
import { selectStreamerQueue } from 'entities/streamer-song-data'
import { Loading } from 'shared/ui'
import { SongDataList, SongListItem } from 'shared/ui/song-data-list'

export const Queue = () => {
    const queue = useSelector(selectStreamerQueue)

    return (
        <>
            {queue.status === 'loading' && <Loading />}
            {queue.status === 'rejected' && <span>Error!</span>}
            {queue.status === 'received' && (
                <SongDataList title="Queue" searchFun={(str: string) => {}}>
                    {queue.list.map((song, index) => (
                        <SongListItem
                            songName={song.name}
                            songLink={song.link}
                            sender={song.sender}
                            number={index}
                            extraInfo={song.durationInSeconds.toString()}
                        />
                    ))}
                </SongDataList>
            )}
        </>
    )
}
