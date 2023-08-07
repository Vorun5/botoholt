import { useDocumentTitle } from 'shared/lib/hooks'
import { useTranslation } from 'react-i18next'

import { ALPageContent, ALPageHeader } from '../../admin-layout/admin-layout'

import styles from './not-found.module.scss'

export const NotFound = () => {
    const { t } = useTranslation()
    useDocumentTitle(t('page-not-found'))

    return (
        <>
            <ALPageHeader>{t('page-not-found')}</ALPageHeader>
            <ALPageContent className={styles.page}>
                <span className={styles.notFount}>404</span>
            </ALPageContent>
        </>
    )
}
