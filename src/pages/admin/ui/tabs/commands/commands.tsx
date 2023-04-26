import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ALPageContent, ALPageHeader } from '../../admin-layout/admin-layout'
import styles from './commands.module.scss'

export const Commands = () => {
    const { t } = useTranslation()

    useEffect(() => {
        window.document.title = t('admin-page.nav.commands')
    }, [])

    return (
        <>
            <ALPageHeader>{t('admin-page.nav.commands')}</ALPageHeader>
            <ALPageContent className={styles.pageContent}>{t('admin-page.nav.commands')}</ALPageContent>
        </>
    )
}
