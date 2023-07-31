import ROLLING from 'shared/assets/emotes/ROLLING.gif'
import { useTranslation } from 'react-i18next'

import styles from './loading.module.scss'

export const Loading = ({ height = 100 }: { height?: number }) => {
    const { t } = useTranslation()

    return (
        <div className={styles.container}>
            <img src={ROLLING} alt="ROLLING" height={height} />
            <span>{t('loading')}</span>
        </div>
    )
}
