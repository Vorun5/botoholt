import { useEffect, useRef } from 'react'
import { useStreamerQueueQuery } from 'entities/streamer-song-data/hooks'
import { apiUrl } from 'shared/api/api'
import PoroSad from 'shared/assets/emotes/PoroSad.png'
import { formatTime, getVideoPreview } from 'shared/lib/helpers'
import { useDanceEmote, useElementSize } from 'shared/lib/hooks'
import { StreamerQueue } from 'shared/types'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { io } from 'socket.io-client'

import styles from './current-song.module.scss'

const CurrentSongExtraInfo = ({ song }: { song: Omit<StreamerQueue, 'queue'> }) => {
    const { t } = useTranslation()

    return (
        <div className={styles.songExtraInfo}>
            <span className={styles.songSender}>
                {t('song-card.by')}
                <span>{song.sender}</span>
            </span>
            {song.durationInSeconds !== null && (
                <span className={styles.songDuration}>
                    {formatTime(song.durationInSeconds - (song.startsFromInSeconds ?? 0), t)}
                </span>
            )}
        </div>
    )
}

interface CurrentSongProps {
    className?: string
    streamerName: string
    center?: boolean
}

const CurrentSongImg = ({ ytLink }: { ytLink: string }) => {
    const preview = getVideoPreview(ytLink)

    return (
        <>
            {preview && (
                <a className={styles.songPreview} href={preview} target="_blank">
                    <img src={preview} alt="" />
                </a>
            )}
        </>
    )
}

export const CurrentSong = ({ center = true, className, streamerName }: CurrentSongProps) => {
    const { t } = useTranslation()
    const login = streamerName.toLocaleLowerCase()
    const { data: queue, isSuccess, refetch } = useStreamerQueueQuery(login)
    const danceEmote = useDanceEmote()
    const songRef = useRef<HTMLDivElement>(null)
    const { width } = useElementSize(songRef)

    useEffect(() => {
        if (isSuccess && queue.isPlaying && queue.name !== null) {
            window.document.title = queue.name
        } else {
            window.document.title = `${streamerName} - Botoholt`
        }
    }, [streamerName, queue])

    useEffect(() => {
        const login = streamerName.toLocaleLowerCase()
        const socket = io(apiUrl.origin, { path: `${apiUrl.pathname}socket`, autoConnect: true })

        socket.on('connect', () => {
            console.log('CONNECTED TO', login)
        })

        socket.emit('subscribe', login)

        socket.on('message', (data) => {
            if (data.channel === login) {
                console.log('UPDATE', data.channel)
                refetch()
            }
        })

        return () => {
            socket.on('disconnect', () => {
                console.log('DISCONNECT', login)
            })

            socket.disconnect()
        }
    }, [streamerName])

    return (
        <>
            {isSuccess && (
                <span className={styles.songStatus}>
                    {queue.isPlaying ? t('song-card.playing') : t('song-card.not-playing')}
                </span>
            )}
            <div
                ref={songRef}
                className={clsx(
                    styles.song,
                    center && styles.songCenter,
                    width < 600 && styles.songSmall,
                    width < 800 && width >= 600 && styles.songCompact,
                    width >= 800 && styles.songNormal,
                    className,
                )}
            >
                {isSuccess && (
                    <>
                        <CurrentSongImg ytLink={queue.link ?? ''}></CurrentSongImg>
                        <div className={styles.songInfo}>
                            {queue.name === null ? (
                                <span className={styles.songEmpty}>
                                    <img src={PoroSad} alt={'PoroSad'} className={styles.songEmptyEmote} />
                                    {t('song-card.empty')}
                                </span>
                            ) : (
                                <div style={{ width: '100%' }}>
                                    <div className={styles.songNameContainer}>
                                        <img
                                            src={queue.isPlaying ? danceEmote : PoroSad}
                                            alt={queue.isPlaying ? 'Dance emote' : 'PoroSad'}
                                            className={styles.songEmote}
                                        />
                                        <p>
                                            <a
                                                className={styles.songName}
                                                href={
                                                    queue.link != null
                                                        ? queue!.link
                                                        : 'https://www.youtube.com/watch?v=UhvaUwtGyH4'
                                                }
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {queue.name}
                                            </a>
                                        </p>
                                    </div>
                                    <CurrentSongExtraInfo song={queue} />
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
