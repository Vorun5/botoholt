import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ALPageContent, ALPageHeader } from '../../admin-layout/admin-layout'
import styles from './song-queue.module.scss'

export const SongQueue = () => {
    const { t } = useTranslation()

    useEffect(() => {
        window.document.title = t('admin-page.nav.song-queue')
    }, [])

    return (
        <>
            <ALPageHeader>{t('admin-page.nav.song-queue')}</ALPageHeader>
            <ALPageContent className={styles.pageContent}>{t('admin-page.nav.song-queue')}</ALPageContent>
        </>
    )
}
