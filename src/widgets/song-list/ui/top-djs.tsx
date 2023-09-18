import { useRef } from 'react'
import { SONG_LIMIT, useStreamerTopDjsQuery } from 'entities/streamer-song-data'
import INSANECAT from 'shared/assets/emotes/INSANECAT.gif'
import { ErrorMessage, Loading, Pagination, SearchField, SongDataList, TopListItem } from 'shared/ui'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { debounce } from 'underscore'

import { ListStatusNotification } from './list-status-notification/list-status-notification'
import { SongListProps } from './song-list'

export const TopDjs = ({
    login,
    period,
    page,
    limit,
    searchStr,
}: Pick<SongListProps, 'period' | 'login' | 'page' | 'limit' | 'searchStr'>) => {
    const { t } = useTranslation()
    const [_, setSearchParams] = useSearchParams()

    const {
        data: topDjs,
        isLoading,
        isError,
        isSuccess,
        fetchStatus,
    } = useStreamerTopDjsQuery({ login, period, from: page * limit, limit, by: searchStr })

    const ref = useRef<HTMLDivElement>(null)

    const handlerSearchBySender = debounce((sender: string) => {}, 1000)

    const changePage = (page: number) => {
        window.scrollTo(0, ref.current!.offsetTop - 20)
        setSearchParams({ period: period, page: page.toString() })
    }

    return (
        <>
            <div ref={ref} />
            <SongDataList title={t('streamer-page.tab-titles.top-djs')}>
                <SearchField onChange={handlerSearchBySender} />
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
                        {topDjs.list.map((dj, index) => (
                            <TopListItem
                                key={dj.name}
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
