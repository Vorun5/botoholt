import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectStreamerTopDjs } from 'entities/streamer-song-data'
import INSANECAT from 'shared/assets/emotes/INSANECAT.gif'
import { ErrorMessage, Loading, SongDataList } from 'shared/ui'
import { TopListItem } from 'shared/ui'
import { ListStatusNotification } from './list-status-notification/list-status-notification'

export const TopDjs = () => {
    const { t } = useTranslation()
    const topDjs = useSelector(selectStreamerTopDjs)

    // TODO: move search logic to redux
    const [topDjsList, setTopDjsList] = useState(topDjs.list)
    const [searchStr, setSearchStr] = useState('')

    const search = (str: string) => {
        setSearchStr(str)
        setTopDjsList(topDjs.list.filter((dj) => dj.name.toLowerCase().includes(str.toLowerCase())))
    }

    useEffect(() => {
        setTopDjsList(topDjs.list)
        search(searchStr)
    }, [topDjs])

    return (
        <>
            <SongDataList title={t('streamer-page.tab-titles.top-djs')} searchFun={search}>
                {topDjs.status === 'loading' && <Loading />}
                {topDjs.status === 'rejected' && <ErrorMessage>{topDjs.error}</ErrorMessage>}
                {topDjs.status === 'received' && topDjs.list.length === 0 && (
                    <ListStatusNotification
                        emote={INSANECAT}
                        altEmote="INSANECAT"
                        title={t('streamer-page.list-is-empty.top-djs')}
                        text={t('streamer-page.list-is-empty.fix')}
                    />
                )}
                {topDjs.status === 'received' &&
                    topDjsList.map((dj) => (
                        <TopListItem
                            key={dj.name}
                            extraInfo={dj.amount.toString()}
                            text={dj.name}
                            number={topDjs.list.findIndex((i) => i === dj) + 1}
                        />
                    ))}
            </SongDataList>
        </>
    )
}
