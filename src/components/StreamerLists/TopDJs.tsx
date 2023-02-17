import { TopDJsListProps } from './TopDJsList.props'
import TopList from './TopList'
import EmptyListMessage from './components/EmptyListMessage/EmptyListMessage'
import useTopDJs from 'hooks/useTopDJs'
import { useTranslation } from 'react-i18next'

const TopDJs = ({ streamerLogin, period }: TopDJsListProps) => {
    const { t } = useTranslation()
    const { topDJs, loading, topDJsIsEmpty } = useTopDJs(streamerLogin, period)

    return (
        <TopList
            title={t('streamer-page.tab-titles.top-djs')}
            loading={loading}
            listIsEmpty={topDJsIsEmpty}
            emptyCard={
                <EmptyListMessage
                    emote='/emotes/INSANECAT.gif'
                    mainText={t('streamer-page.list-is-empty.top-djs')}
                    text={t('streamer-page.list-is-empty.fix')}
                />
            }
            items={topDJs.map((topDJ, index) => {
                return {
                    text: topDJ.requestedBy,
                    number: index + 1,
                    count: topDJ.count,
                    link: null,
                }
            })}
        />
    )
}

export default TopDJs
