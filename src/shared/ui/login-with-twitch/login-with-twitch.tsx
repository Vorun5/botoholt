import { TwitchIcon } from 'shared/assets/icons/social'
import { MODE } from 'shared/mode'
import { useTranslation } from 'react-i18next'

import styles from './login-with-twitch.module.scss'

export const LoginWithTwitch = () => {
    const { t } = useTranslation()

    return (
        <button
            type="button"
            className={styles.login}
            onClick={() => {
                window.location.href = `https://${MODE}bho.lt/api/v1/admin/auth/twitch`
            }}
        >
            <span className={styles.loginText}>
                <TwitchIcon className={styles.loginIcon} />
            </span>
            <span className={styles.loginText}>{t('login-page.login.bth')}</span>
        </button>
    )
}
