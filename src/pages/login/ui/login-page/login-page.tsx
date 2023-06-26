import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AboutBotoholt } from 'widgets'
import pepeD from 'shared/assets/emotes/pepeD.gif'
import { TwitchIcon } from 'shared/assets/icons/social'
import { useMediaQuery } from 'shared/lib/hooks'
import { CreatedWithLove } from 'shared/ui'
import styles from './login-page.module.scss'

const Emote = () => <img draggable={false} src={pepeD} alt="pepeD" className={styles.loginEmote} />

export const LoginPage = () => {
    useEffect(() => {
        window.document.title = 'Login'
    }, [])

    const { t } = useTranslation()
    const isDesktop = useMediaQuery('(min-width: 767px)')

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.pageBackground} />
            <h1 className={styles.pageTitle}> {t('login-page.welcome')}</h1>
            <div className={styles.pageContainer}>
                <div className={styles.login}>
                    {isDesktop && <Emote />}
                    <div className={styles.loginContent}>
                        <h1 className={styles.loginTitle}>
                            {t('login-page.login.title')}
                            {!isDesktop && <Emote />}
                        </h1>
                        <span className={styles.loginDescription}>{t('login-page.login.description')}</span>
                        <button
                            type="button"
                            className={styles.loginBth}
                            onClick={() => {
                                window.open('https://dev.bho.lt/api/v1/admin/auth/twitch')
                            }}
                        >
                            <span className={styles.loginBthText}>
                                <TwitchIcon className={styles.loginBthIcon} />
                            </span>
                            <span className={styles.loginBthText}>{t('login-page.login.bth')}</span>
                        </button>
                    </div>
                </div>
                <div className={styles.pageAbout}>
                    <AboutBotoholt />
                </div>
                <div className={styles.pageFooter}>
                    <CreatedWithLove />
                </div>
            </div>
        </div>
    )
}
