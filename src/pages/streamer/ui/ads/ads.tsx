import clsx from 'clsx'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import EZ from 'shared/assets/emotes/EZ.png'
import Money from 'shared/assets/emotes/money.gif'
import { ReactComponent as DA } from 'shared/assets/icons/da.svg'
import { ReactComponent as Star } from 'shared/assets/icons/star.svg'
import { useElementSize } from 'shared/lib/hooks'
import { useToast } from 'shared/lib/hooks'
import { Banner, Button, CopiedText } from 'shared/ui'
import styles from './ads.module.scss'

interface AdsProps {
    donationAlertsLink: string
    className?: string
}

export const Ads = ({ donationAlertsLink, className }: AdsProps) => {
    const { t } = useTranslation()
    const toastTools = useToast()
    const adsRef = useRef<HTMLDivElement>(null)
    const { width } = useElementSize(adsRef)

    return (
        <div
            ref={adsRef}
            className={clsx(styles.ads, width < 500 ? styles.adsCompact : styles.adsNormal, className && className)}
        >
            <Banner className={styles.banner} style="secondary">
                <div>
                    <img className={styles.bannerEmote} src={Money} alt="Money" />
                    <span className={styles.bannerText}>{t('support-streamer')}</span>
                </div>
                <Button style="secondary" onClick={() => window.open(donationAlertsLink)}>
                    <div className={styles.bannerBth}>
                        <DA className={styles.bannerBthIcon} />
                        <span>{t('support-streamer-bth')}</span>
                    </div>
                </Button>
            </Banner>
            <Banner className={styles.banner}>
                <div>
                    <img className={styles.bannerEmote} src={EZ} alt="EZ" />
                    <span className={styles.bannerText}>{t('connect-bot')}</span>
                </div>
                <Button
                    onClick={() => {
                        if (toastTools) {
                            toastTools.addToast(
                                {
                                    title: t('connect-bot-bth') ?? '',
                                    children: (
                                        <span className={styles.toastText}>
                                            {t('connect-bot-text-1')}
                                            <CopiedText>Urbinholt#0640</CopiedText>
                                            {t('connect-bot-text-2')}
                                        </span>
                                    ),
                                },
                                { position: 'bottom' },
                            )
                        }
                    }}
                >
                    <div className={styles.bannerBth}>
                        <Star className={styles.bannerBthIcon} />
                        <span>{t('connect-bot-bth')}</span>
                    </div>
                </Button>
            </Banner>
        </div>
    )
}
