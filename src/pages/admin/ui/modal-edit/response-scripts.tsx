import { useTranslation } from 'react-i18next'
import styles from './modal-edit.module.scss'

export const ResponseScripts = () => {
    const { t } = useTranslation()

    return (
        <div className={styles.responseScripts}>
            <span className={styles.title}>{t('edit-commands.scenarios.title')}</span>
            <span className={styles.description}>
                {t('edit-commands.scenarios.text-1')} <br />
                {t('edit-commands.scenarios.text-2')} <br />
                {t('edit-commands.scenarios.text-3')}
            </span>
        </div>
    )
}
