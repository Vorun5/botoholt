import { useSelector } from 'react-redux'
import { selectStreamerHistorySongs } from 'entities/streamer-song-data'
import { capitalize } from 'shared/lib/helpers'
import i18n from 'shared/lib/i18n/i18n'
import { Loading } from 'shared/ui'
import { SongDataList, SongListItem } from 'shared/ui/song-data-list'

export const History = () => {
    const history = useSelector(selectStreamerHistorySongs)

    return (
        <>
            {history.status === 'loading' && <Loading />}
            {history.status === 'rejected' && <span>Error!</span>}
            {history.status === 'received' && (
                <SongDataList title="History" searchFun={(str: string) => {}}>
                    {history.list.map((song, index) => {
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
                                key={index}
                                songName={song.name}
                                songLink={song.link}
                                sender={song.sender}
                                number={index}
                                extraInfo={`${formatDateTime} ${capitalize(formatDateWeek)}`}
                            />
                        )
                    })}
                </SongDataList>
            )}
        </>
    )
}
