import { useTranslation } from 'react-i18next'

import styles from './created-with-love.module.scss'

export const CreatedWithLove = () => {
    const { t } = useTranslation()

    return (
        <div className={styles.container}>
            <p className={styles.creators}>
                {t('creators.create-with-love-by')}
                <a href="https://www.twitch.tv/vorun5">@Vorun5</a>
                <br />
                <a href="https://www.twitch.tv/urbinholt">@Urbinholt</a>
                {t('and')}
                <a href="https://www.twitch.tv/montagerr_">@montagerr_</a>
            </p>
            <a href="https://boosty.to/botoholt/donate" className={styles.support}>
                {t('support')}
            </a>
        </div>
    )
}
