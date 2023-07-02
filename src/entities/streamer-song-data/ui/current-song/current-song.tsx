import clsx from 'clsx'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectStreamerCurrentSong } from 'entities/streamer-song-data/model'
import PoroSad from 'shared/assets/emotes/PoroSad.png'
import { getVideoPreview } from 'shared/lib/helpers'
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
            <span className={styles.songDuration}>
                {`${Math.floor(song.durationInSeconds! / 60)}${t('minutes')} 
                ${song.durationInSeconds! % 60}${t('seconds')}`}
            </span>
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

    const { danceEmote } = useDanceEmote()

    const songRef = useRef<HTMLDivElement>(null)
    const { width } = useElementSize(songRef)

    const preview = getVideoPreview(song.link ?? '')

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
                        <div>
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
