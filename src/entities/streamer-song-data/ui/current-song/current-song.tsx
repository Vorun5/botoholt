import clsx from 'clsx'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import peepoDj from 'shared/assets/emotes/peepoDJ.gif'
import PoroSad from 'shared/assets/emotes/PoroSad.png'
import { useDanceEmote, useElementSize } from 'shared/lib/hooks'
import { StreamerQueue } from 'shared/types'
import styles from './current-song.module.scss'

interface CurrentSongProps {
    song: Omit<StreamerQueue, 'queue'>
    center?: boolean
}

const CurrentSongExtraInfo = ({ song }: CurrentSongProps) => {
    const { t } = useTranslation()

    return (
        <div className={styles.songExtraInfo}>
            <img className={styles.songSenderEmote} src={peepoDj} alt="peepoDj" />
            <span className={styles.songSender}>{song.sender}</span>
            <span className={styles.songDuration}>
                {`${Math.floor(song.durationInSeconds! / 60)}${t('minutes')} 
                ${song.durationInSeconds! % 60}${t('seconds')}`}
            </span>
        </div>
    )
}

export const CurrentSong = ({ song, center = true }: CurrentSongProps) => {
    const { t } = useTranslation()
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
