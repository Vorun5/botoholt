import { ImportantIcon } from 'shared/assets/icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import styles from './new-update.module.scss'

export const NewUpdate = () => {
    const { t } = useTranslation()

    return (
        <div className={styles.updates}>
            <h2 className={styles.updatesTitle}>
                <ImportantIcon /> New updates!
            </h2>
            <img className={styles.updatesImg} src="/src/shared/assets/images/updates.png" alt="updates" />
            <span className={styles.updatesDescription}>
                {t('new-updates.text-1')}{' '}
                <span className={styles.updatesDescriptionVersion}>{t('new-updates.version')}</span> <br />
                {t('new-updates.text-2')}
            </span>
            <Link className={styles.updatesBth} to={'/login'}>
                {t('new-updates.bth-text')}
            </Link>
        </div>
    )
}
