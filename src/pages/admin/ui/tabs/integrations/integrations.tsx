import { useDocumentTitle } from 'shared/lib/hooks'
import { AdminAuth } from 'shared/types'
import { useTranslation } from 'react-i18next'

import { ALPageContent, ALPageHeader } from '../../admin-layout/admin-layout'
import { Donationalerts } from './ui/donationalerts'

import styles from './integrations.module.scss'

interface IntegrationsProps {
    authData: AdminAuth
}

export const Integrations = ({ authData }: IntegrationsProps) => {
    const { t } = useTranslation()
    useDocumentTitle(t('admin-page.nav.integrations'))

    return (
        <>
            <ALPageHeader description={t('admin-page.integrations.page-description')!}>
                {t('admin-page.nav.integrations')}
            </ALPageHeader>
            <ALPageContent className={styles.pageContent}>
                <Donationalerts authData={authData} />
            </ALPageContent>
        </>
    )
}
