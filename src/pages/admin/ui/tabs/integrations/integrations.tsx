import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ALPageContent, ALPageHeader } from '../../admin-layout/admin-layout'
import styles from './integrations.module.scss'

export const Integrations = () => {
    const { t } = useTranslation()

    useEffect(() => {
        window.document.title = t('admin-page.nav.integrations')
    }, [])

    return (
        <>
            <ALPageHeader>{t('admin-page.nav.integrations')}</ALPageHeader>
            <ALPageContent className={styles.pageContent}>{t('admin-page.nav.integrations')}</ALPageContent>
        </>
    )
}
