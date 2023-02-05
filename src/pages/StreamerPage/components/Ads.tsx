import styles from '../StreamerPage.module.css'
import Ad from 'components/Ad/Ad'
import { useTranslation } from 'react-i18next'
import Snackbar from 'components/Snackbar/Snackbar'
import { useState } from 'react'

const Ads = ({ daLink }: { daLink: string }) => {
    const { t } = useTranslation()
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

    return (
        <>
            <Snackbar
                title={t('connect-bot-bth')!}
                isOpen={isSnackbarOpen}
                close={() => setIsSnackbarOpen(false)}
            >
                {t('connect-bot-text-1')}
                <span className={styles.contact}>Urbinholt#0640</span>
                {t('connect-bot-text-2')}
            </Snackbar>
            <div className={styles.main__board}>
                <div className={styles.board__item}>
                    <Ad
                        text={t('support-streamer')}
                        bthIcon="/icons/da-hover.svg"
                        icon="/emotes/money.gif"
                        bthText={t('support-streamer-bth')}
                        adStyle="secondary"
                        bthOnClick={() => window.open(daLink)}
                    />
                </div>
                <div className={styles.board__item}>
                    <Ad
                        text={t('connect-bot')}
                        bthIcon="/icons/star-hover.svg"
                        icon="/emotes/EZ.png"
                        bthText={t('connect-bot-bth')}
                        adStyle="primary"
                        bthOnClick={() => setIsSnackbarOpen(!isSnackbarOpen)}
                    />
                </div>
            </div>
        </>
    )
}

export default Ads
