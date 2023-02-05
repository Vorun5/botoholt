import styles from './CreateWith.module.css'
import { useTranslation } from 'react-i18next'

const CreateWith = () => {
    const { t } = useTranslation()

    return (
        <div className={styles.container}>
            <p className={styles.creators}>
                {t('creators.create-with-love-by')}
                <a href="https://www.twitch.tv/vorun5">@Vorun5</a>
                <br />
                <a href="https://www.twitch.tv/urbinholt">@Urbinholt</a>
                {t('and')}
                <a href="https://www.twitch.tv/montag_r">@montag_r</a>
            </p>
            <a href="https://fantalks.io/r/botoholt" className={styles.support}>
                {t('support')}
            </a>
        </div>
    )
}

export default CreateWith
