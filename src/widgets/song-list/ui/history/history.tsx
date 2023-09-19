import { useRef } from 'react'
import { useStreamerHistoryQuery } from 'entities/streamer-song-data'
import FeelsOkayMan from 'shared/assets/emotes/FeelsOkayMan.png'
import { HyperinkIcon } from 'shared/assets/icons'
import { capitalize } from 'shared/lib/helpers'
import i18n from 'shared/lib/i18n/i18n'
import { Dropdown, ErrorMessage, Loading, Pagination, SearchField } from 'shared/ui'
import { SongDataList, SongListItem } from 'shared/ui/song-data-list'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { debounce } from 'underscore'

import { getYtPlaylistLink } from '../../lib'
import { ListStatusNotification } from '../list-status-notification/list-status-notification'
import { SongListProps } from '../song-list'

import styles from './history.module.scss'

export const History = ({
    login,
    page,
    limit,
    searchStr,
    searchType,
}: Pick<SongListProps, 'login' | 'page' | 'limit' | 'searchStr' | 'searchType'>) => {
    const { t } = useTranslation()
    const [_, setSearchParams] = useSearchParams()

    const {
        data: history,
        isSuccess,
        isLoading,
        isError,
        fetchStatus,
    } = useStreamerHistoryQuery({
        login,
        from: page * limit - limit,
        limit: limit,
        name: searchType === 'name' ? searchStr : undefined,
        by: searchType === 'sender' ? searchStr : undefined,
    })

    const ytPlaylistLink = getYtPlaylistLink(isSuccess ? history.list.map((song) => song.link) : [])

    const ref = useRef<HTMLDivElement>(null)

    const onChangePage = (newPage: number) => {
        window.scrollTo(0, ref.current!.offsetTop - 20)
        setSearchParams(
            new URLSearchParams({
                limit: limit.toString(),
                page: newPage.toString(),
                search_type: searchType,
                search_str: searchStr,
            }),
        )
    }

    const onChangeSearchStr = debounce((str: string) => {
        setSearchParams(
            new URLSearchParams({
                limit: limit.toString(),
                page: page.toString(),
                search_type: searchType,
                search_str: str,
            }),
        )
    }, 1000)

    const onSelectSearchType = (type: string) => {
        setSearchParams(
            new URLSearchParams({
                limit: limit.toString(),
                page: page.toString(),
                search_type: type === 'Search by name' ? 'name' : 'sender',
                search_str: searchStr,
            }),
        )
    }

    return (
        <>
            <div ref={ref} />
            <SongDataList
                title={
                    ytPlaylistLink !== null ? (
                        <a target="_blank" href={ytPlaylistLink}>
                            {t('streamer-page.tab-titles.history')} <HyperinkIcon />
                        </a>
                    ) : (
                        t('streamer-page.tab-titles.history')
                    )
                }
            >
                <div className={styles.searchContainer}>
                    <div className={styles.search}>
                        <SearchField defaultValue={searchStr} onChange={onChangeSearchStr} />
                    </div>
                    <Dropdown
                        items={['Search by name', 'Search by sender']}
                        selectedItem={searchType === 'name' ? 'Search by name' : 'Search by sender'}
                        onSelect={onSelectSearchType}
                    />
                </div>
                {isLoading && <Loading />}
                {isError && <ErrorMessage>{`Error status: ${fetchStatus}`}</ErrorMessage>}
                {isSuccess && history.list.length === 0 && (
                    <ListStatusNotification
                        emote={FeelsOkayMan}
                        altEmote="FeelsOkayMan"
                        title={t('streamer-page.list-is-empty.history')}
                        text={t('streamer-page.list-is-empty.fix')}
                    />
                )}
                {isSuccess && (
                    <>
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
                            const formatDate = new Intl.DateTimeFormat(i18n.language).format(date)

                            return (
                                <SongListItem
                                    key={song.id}
                                    songName={song.name}
                                    songLink={song.link}
                                    sender={song.sender}
                                    number={history.list.findIndex((i) => i === song) + 1 + history.from}
                                    extraInfo={
                                        <>
                                            {`${formatDateTime} ${capitalize(formatDateWeek)}`}
                                            <br />
                                            {formatDate}
                                        </>
                                    }
                                />
                            )
                        })}
                        <Pagination
                            total={Math.ceil(history.total / limit)}
                            page={history.from / limit + 1}
                            changePage={onChangePage}
                        />
                    </>
                )}
            </SongDataList>
        </>
    )
}
