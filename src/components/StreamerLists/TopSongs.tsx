import TopList from './TopList'
import { TopSongsListProps } from './TopSongsList.props'
import EmptyListMessage from './components/EmptyListMessage/EmptyListMessage'
import useTopSongs from 'hooks/useTopSongs'
import { useTranslation } from 'react-i18next'

const TopSongs = ({ streamerLogin, period }: TopSongsListProps) => {
    const { t } = useTranslation()
    const { topSongs, loading, topSongsIsEmpty } = useTopSongs(streamerLogin, period)

    return (
        <TopList
            title={t('streamer-page.tab-titles.top-songs')}
            loading={loading}
            listIsEmpty={topSongsIsEmpty}
            emptyCard={
                <EmptyListMessage
                    emote='/emotes/INSANECAT.gif'
                    mainText={t('streamer-page.list-is-empty.top-songs')}
                    text={t('streamer-page.list-is-empty.fix')}
                />
            }
            items={topSongs.map((topSong, index) => {
                return {
                    text: topSong.mediaName,
                    number: index + 1,
                    count: topSong.count,
                    link: topSong.mediaLink,
                }
            })}
        />
    )
}

export default TopSongs
