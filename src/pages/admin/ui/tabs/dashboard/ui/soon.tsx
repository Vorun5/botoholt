import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import styles from '../dashboard.module.scss'

export const Soon = ({ children }: { children: ReactNode }) => {
    const { t } = useTranslation()
    return (
        <div className={styles.soon}>
            {children}
            <div className={styles.soonOverlay}>
                <span className={styles.soonText}>{t('soon')}</span>
            </div>
        </div>
    )
}
