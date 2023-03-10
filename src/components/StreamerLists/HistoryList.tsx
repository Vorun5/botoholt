import SongList from './SongList'
import EmptyListMessage from './components/EmptyListMessage/EmptyListMessage'
import useHistory from 'hooks/useHistory'
import { useTranslation } from 'react-i18next'
import { capitalize } from 'utils'

const HistoryList = ({ streamerLogin }: { streamerLogin: string }) => {
    const { history, loading, historyIsEmpty } = useHistory(streamerLogin)
    const { t, i18n } = useTranslation()

    return (
        <SongList
            title={t('streamer-page.tab-titles.history')}
            loading={loading}
            listIsEmpty={historyIsEmpty}
            emptyCard={
                <EmptyListMessage
                    emote='/emotes/Orkdwn.gif'
                    mainText={t('streamer-page.list-is-empty.history')}
                    text={t('streamer-page.list-is-empty.fix')}
                />
            }
            items={history.map((song, index) => {
                const date = new Date(song.timeFrom)
                const formatDateWeek = new Intl.DateTimeFormat(i18n.language, {
                    weekday: 'short',
                }).format(date)
                const formatDateTime = new Intl.DateTimeFormat(i18n.language, {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false,
                }).format(date)

                return {
                    mediaName: song.mediaName,
                    mediaLink: song.mediaLink,
                    requestedBy: song.requestedBy,
                    number: index + 1,
                    extraText: `${formatDateTime} ${capitalize(formatDateWeek)}`,
                }
            })}
        />
    )
}

export default HistoryList
