import { useEffect, useRef } from 'react'
import { loadStreamerQueue, selectStreamerCurrentSong } from 'entities/streamer-song-data/model'
import { apiUrl } from 'shared/api/api'
import PoroSad from 'shared/assets/emotes/PoroSad.png'
import { formatTime, getVideoPreview } from 'shared/lib/helpers'
import { useDanceEmote, useElementSize } from 'shared/lib/hooks'
import { useAppDispatch } from 'shared/lib/store'
import { StreamerQueue } from 'shared/types'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
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

export const CurrentSong = ({ center = true, className, streamerName }: CurrentSongProps) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const song = useSelector(selectStreamerCurrentSong)

    const danceEmote = useDanceEmote()

    const songRef = useRef<HTMLDivElement>(null)
    const { width } = useElementSize(songRef)

    const preview = getVideoPreview(song.link ?? '')

    useEffect(() => {
        if (song.isPlaying && song.name !== null) {
            window.document.title = song.name
        } else {
            window.document.title = `${streamerName} - Botoholt`
        }
    }, [streamerName, song])

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
                dispatch(loadStreamerQueue(data.channel))
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
            <span className={styles.songStatus}>
                {song.isPlaying ? t('song-card.playing') : t('song-card.not-playing')}
            </span>
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
                {preview && (
                    <a className={styles.songPreview} href={song.link ?? ''} target="_blank">
                        <img src={preview} alt="" />
                    </a>
                )}
                <div className={styles.songInfo}>
                    {song.name === null ? (
                        <span className={styles.songEmpty}>
                            <img src={PoroSad} alt={'PoroSad'} className={styles.songEmptyEmote} />
                            {t('song-card.empty')}
                        </span>
                    ) : (
                        <div style={{ width: '100%' }}>
                            <div className={styles.songNameContainer}>
                                <img
                                    src={song.isPlaying ? danceEmote : PoroSad}
                                    alt={song.isPlaying ? 'Dance emote' : 'PoroSad'}
                                    className={styles.songEmote}
                                />
                                <p>
                                    <a
                                        className={styles.songName}
                                        href={
                                            song.link != null
                                                ? song!.link
                                                : 'https://www.youtube.com/watch?v=UhvaUwtGyH4'
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {song.name}
                                    </a>
                                </p>
                            </div>
                            <CurrentSongExtraInfo song={song} />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
