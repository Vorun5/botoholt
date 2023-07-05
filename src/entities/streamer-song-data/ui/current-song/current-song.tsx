import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { selectStreamer } from 'entities/streamer'
import { loadStreamerQueue, selectStreamerCurrentSong } from 'entities/streamer-song-data/model'
import PoroSad from 'shared/assets/emotes/PoroSad.png'
import { formatTime, getVideoPreview } from 'shared/lib/helpers'
import { useDanceEmote, useElementSize } from 'shared/lib/hooks'
import { StreamerQueue } from 'shared/types'
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
    center?: boolean
}

export const CurrentSong = ({ center = true, className }: CurrentSongProps) => {
    const { t } = useTranslation()
    const song = useSelector(selectStreamerCurrentSong)

    const danceEmote = useDanceEmote()

    const songRef = useRef<HTMLDivElement>(null)
    const { width } = useElementSize(songRef)

    const preview = getVideoPreview(song.link ?? '')

    const { streamerName } = useParams()
    const login = streamerName || ''
    const streamer = useSelector(selectStreamer)

    useEffect(() => {
        if (song.isPlaying && song.name !== null) {
            window.document.title = song.name
        } else {
            window.document.title = `${streamer.streamer.name ? streamer.streamer.name : login} - Botoholt`
        }
    }, [streamer, song])

    useEffect(() => {
        const socket = io('https://dev.bho.lt', { path: '/api/v1/socket', autoConnect: true })

        socket.on('connect', () => {
            console.log('Connected to server')
        })

        socket.emit('subscribe', login)

        socket.on('message', (data) => {
            if (data.channel === login) {
                console.log('Queue update')

                loadStreamerQueue(login)
            }
        })

        if (socket.hasListeners('message')) {
            console.log('Listener for message event is registered')
        } else {
            console.log('Listener for message event is not registered')
        }

        return () => {
            socket.on('disconnect', () => {
                console.log('disconnect')
            })

            socket.disconnect()
        }
    }, [login])

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
