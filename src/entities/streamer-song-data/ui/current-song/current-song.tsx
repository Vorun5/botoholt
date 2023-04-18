import clsx from 'clsx'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectStreamerCurrentSong } from 'entities/streamer-song-data/model'
import peepoDj from 'shared/assets/emotes/peepoDJ.gif'
import PoroSad from 'shared/assets/emotes/PoroSad.png'
import { useDanceEmote, useElementSize } from 'shared/lib/hooks'
import { StreamerQueue } from 'shared/types'
import styles from './current-song.module.scss'

const CurrentSongExtraInfo = ({ song }: { song: Omit<StreamerQueue, 'queue'> }) => {
    const { t } = useTranslation()

    return (
        <div className={styles.songExtraInfo}>
            <img className={styles.songSenderEmote} src={peepoDj} alt="peepoDj" />
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

    return (
        <div
            ref={songRef}
            className={clsx(
                styles.song,
                center && styles.songCenter,
                width < 400 && styles.songSmall,
                width < 600 && width >= 400 && styles.songCompact,
                width >= 600 && styles.songNormal,
                className && className,
            )}
        >
            <div className={styles.songFlex}>
                <img
                    src={song.isPlaying ? danceEmote : PoroSad}
                    alt={song.isPlaying ? 'Dance emote' : 'PoroSad'}
                    className={styles.songEmote}
                />
                {song.name === null ? (
                    <span className={styles.songEmpty}>{t('song-card.empty')}</span>
                ) : (
                    <div>
                        <span className={styles.songStatus}>
                            {song.isPlaying ? t('song-card.playing') : t('song-card.not-playing')}
                        </span>
                        <a
                            className={styles.songName}
                            href={song.link != null ? song!.link : 'https://www.youtube.com/watch?v=UhvaUwtGyH4'}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {song.name}
                        </a>
                        {width >= 600 && <CurrentSongExtraInfo song={song} />}
                    </div>
                )}
            </div>
            {width < 600 && song.name !== null && <CurrentSongExtraInfo song={song} />}
        </div>
    )
}
