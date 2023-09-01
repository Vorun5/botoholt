import { useEffect } from 'react'
import { useStreamerHistoryQuery, useStreamerQueueQuery } from 'entities/streamer-song-data'
import { apiUrl } from 'shared/api/api'
import { HyperinkIcon } from 'shared/assets/icons'
import {
    Button,
    ButtonIcon,
    ButtonText,
    Card,
    CardDescription,
    CardExpanded,
    CardFooter,
    CardTitle,
    ErrorMessage,
} from 'shared/ui'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { io } from 'socket.io-client'

import styles from '../dashboard.module.scss'

interface HyperinkButtonProps {
    to: string
    children: string
}

const HyperinkButton = ({ to, children }: HyperinkButtonProps) => {
    return (
        <Link to={to}>
            <Button>
                <ButtonText>{children}</ButtonText>
                <ButtonIcon margin="left">
                    <HyperinkIcon />
                </ButtonIcon>
            </Button>
        </Link>
    )
}

export const LastOrderSong = ({ login }: { login: string }) => {
    const { t } = useTranslation()
    const {
        data: queue,
        isSuccess: isQueueSuccess,
        isError: isQueueError,
        isLoading: isQueueLodading,
        fetchStatus: queueFetchStatus,
        refetch: refetchQueue,
    } = useStreamerQueueQuery(login)
    const {
        data: history,
        isSuccess: isHistorySuccess,
        isError: isHistoryError,
        refetch: refetchHistory,
    } = useStreamerHistoryQuery({
        login,
        from: 0,
        limit: 1,
        by: '',
        name: '',
    })

    useEffect(() => {
        const socket = io(apiUrl.origin, { path: `${apiUrl.pathname}socket`, autoConnect: true })

        socket.on('connect', () => {
            console.log('CONNECTED TO', login)
        })

        socket.emit('subscribe', login)

        socket.on('message', (data) => {
            if (data.channel === login) {
                console.log('UPDATE', data.channel)
                refetchQueue()
                refetchHistory()
            }
        })

        return () => {
            socket.on('disconnect', () => {
                console.log('DISCONNECT', login)
            })

            socket.disconnect()
        }
    }, [login])

    const getLastSong = () => {
        if (isQueueSuccess && queue.queue.length !== 0) return queue.queue[queue.queue.length - 1]
        if (isHistorySuccess && history.list.length !== 0) return history.list[0]
    }

    const song = getLastSong()
    return (
        <Card
            style="green"
            className={styles.song}
            skeleton={isQueueLodading}
            s={{
                minHeight: '225px',
            }}
        >
            {isQueueError && isHistoryError && <ErrorMessage>{`Error status: ${queueFetchStatus}`}</ErrorMessage>}
            {song && (
                <>
                    <CardDescription style="green">{t('song-card.last-song')}</CardDescription>
                    <CardTitle style="green">
                        <a href={song.link} target="_blank">
                            {song.name}
                        </a>
                    </CardTitle>
                    <CardExpanded>
                        <CardDescription className={styles.songSender}>
                            {t('song-card.by')} {song.sender}
                        </CardDescription>
                    </CardExpanded>
                    <CardFooter className={styles.songFooter}>
                        <HyperinkButton to="/admin/songs">{t('streamer-page.tabs.queue')}</HyperinkButton>
                        <HyperinkButton to="/admin/songs/h">{t('streamer-page.tabs.history')}</HyperinkButton>
                        <HyperinkButton to="/admin/songs/top/djs">{t('streamer-page.tabs.top-djs')}</HyperinkButton>
                        <HyperinkButton to="/admin/songs/top/songs">{t('streamer-page.tabs.top-songs')}</HyperinkButton>
                    </CardFooter>
                </>
            )}
        </Card>
    )
}
