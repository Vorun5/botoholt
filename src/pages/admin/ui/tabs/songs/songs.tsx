import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { CurrentSong } from 'entities/streamer-song-data'
import { AdminAuth } from 'shared/types'
import { ALPageContent, ALPageHeader } from '../../admin-layout/admin-layout'
import styles from './songs.module.scss'

interface SongsProps {
    streamer: AdminAuth
}

export const Songs = ({ streamer }: SongsProps) => {
    const { t } = useTranslation()

    useEffect(() => {
        window.document.title = t('admin-page.nav.song-queue')
    }, [])

    return (
        <>
            <ALPageHeader>{t('admin-page.nav.song-queue')}</ALPageHeader>
            <ALPageContent className={styles.pageContent}>
                <CurrentSong streamerName={streamer.name} />
            </ALPageContent>
        </>
    )
}
