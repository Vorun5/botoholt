import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { SONG_LIMIT, selectStreamerTopDjs } from 'entities/streamer-song-data'
import INSANECAT from 'shared/assets/emotes/INSANECAT.gif'
import { Period } from 'shared/types'
import { ErrorMessage, Loading, Pagination, SongDataList, TopListItem } from 'shared/ui'
import { ListStatusNotification } from './list-status-notification/list-status-notification'

export const TopDjs = ({ period }: { period: Period }) => {
    const { t } = useTranslation()
    const [_, setSearchParams] = useSearchParams()
    const topDjs = useSelector(selectStreamerTopDjs)
    const total = Math.ceil(topDjs.total / SONG_LIMIT)
    const [topDjsList, setTopDjsList] = useState(topDjs.list)
    const [searchStr, setSearchStr] = useState('')
    const ref = useRef<HTMLDivElement>(null)

    const search = (str: string) => {
        setSearchStr(str)
        setTopDjsList(topDjs.list.filter((dj) => dj.name.toLowerCase().includes(str.toLowerCase())))
    }

    useEffect(() => {
        setTopDjsList(topDjs.list)
        search(searchStr)
    }, [topDjs])

    const changePage = (page: number) => {
        window.scrollTo(0, ref.current!.offsetTop - 20)
        setSearchParams({ period: period, page: page.toString() })
    }

    return (
        <>
            <div ref={ref} />
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
                {topDjs.status === 'received' && (
                    <>
                        {topDjsList.map((dj, index) => (
                            <TopListItem
                                key={index + 1 + topDjs.from}
                                extraInfo={dj.amount.toString()}
                                text={dj.name}
                                number={topDjs.list.findIndex((i) => i === dj) + 1 + topDjs.from}
                            />
                        ))}
                        <Pagination total={total} page={topDjs.from / SONG_LIMIT + 1} changePage={changePage} />
                    </>
                )}
            </SongDataList>
        </>
    )
}
