import styles from './Loading.module.css'
import { useTranslation } from 'react-i18next'

const Loading = () => {
    const { t } = useTranslation()

    return (
        <div className={styles.container}>
            <img src="/emotes/ROLLING.gif" alt="ROLLING" />
            <span>{t('loading')}</span>
        </div>
    )
}

export default Loading
