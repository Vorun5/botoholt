import { AboutBotoholt } from 'widgets'
import pepeD from 'shared/assets/emotes/pepeD.gif'
import { useDocumentTitle, useMediaQuery } from 'shared/lib/hooks'
import { CreatedWithLove, LoginWithTwitch } from 'shared/ui'
import { useTranslation } from 'react-i18next'

import styles from './login-page.module.scss'

const Emote = () => <img draggable={false} src={pepeD} alt="pepeD" className={styles.loginEmote} />

export const LoginPage = () => {
    const { t } = useTranslation()
    useDocumentTitle('Login')
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
                        <LoginWithTwitch />
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
