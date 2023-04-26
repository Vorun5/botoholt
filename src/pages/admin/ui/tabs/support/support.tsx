import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ALPageContent, ALPageHeader } from '../../admin-layout/admin-layout'
import styles from './support.module.scss'

export const Support = () => {
    const { t } = useTranslation()

    useEffect(() => {
        window.document.title = t('admin-page.nav.support')
    }, [])

    return (
        <>
            <ALPageHeader>{t('admin-page.nav.support')}</ALPageHeader>
            <ALPageContent className={styles.pageContent}>{t('admin-page.nav.support')}</ALPageContent>
        </>
    )
}
