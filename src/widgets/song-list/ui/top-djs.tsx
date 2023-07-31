import { useEffect, useRef, useState } from 'react'
import { SONG_LIMIT, useStreamerTopDjsQuery } from 'entities/streamer-song-data'
import INSANECAT from 'shared/assets/emotes/INSANECAT.gif'
import { Period } from 'shared/types'
import { ErrorMessage, Loading, Pagination, SongDataList, TopListItem } from 'shared/ui'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { ListStatusNotification } from './list-status-notification/list-status-notification'

export const TopDjs = ({ period, from, login }: { period: Period; login: string; from: number }) => {
    const { t } = useTranslation()
    const [_, setSearchParams] = useSearchParams()
    const {
        data: topDjs,
        isLoading,
        isError,
        isSuccess,
        fetchStatus,
    } = useStreamerTopDjsQuery({ login, period, from, total: SONG_LIMIT })

    const [topDjsList, setTopDjsList] = useState(isSuccess ? topDjs.list : [])
    const [searchStr, setSearchStr] = useState('')
    const ref = useRef<HTMLDivElement>(null)

    const search = (str: string) => {
        if (!isSuccess) return
        setSearchStr(str)
        setTopDjsList(topDjs.list.filter((dj) => dj.name.toLowerCase().includes(str.toLowerCase())))
    }

    useEffect(() => {
        if (!isSuccess) return
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
                {isLoading && <Loading />}
                {isError && <ErrorMessage>{`Error status: ${fetchStatus}`}</ErrorMessage>}
                {isSuccess && topDjs.list.length === 0 && (
                    <ListStatusNotification
                        emote={INSANECAT}
                        altEmote="INSANECAT"
                        title={t('streamer-page.list-is-empty.top-djs')}
                        text={t('streamer-page.list-is-empty.fix')}
                    />
                )}
                {isSuccess && (
                    <>
                        {topDjsList.map((dj, index) => (
                            <TopListItem
                                key={index + 1 + topDjs.from}
                                extraInfo={dj.amount.toString()}
                                text={dj.name}
                                number={topDjs.list.findIndex((i) => i === dj) + 1 + topDjs.from}
                            />
                        ))}
                        <Pagination
                            total={Math.ceil(topDjs.total / SONG_LIMIT)}
                            page={topDjs.from / SONG_LIMIT + 1}
                            changePage={changePage}
                        />
                    </>
                )}
            </SongDataList>
        </>
    )
}
