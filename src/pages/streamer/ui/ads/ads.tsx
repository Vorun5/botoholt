import clsx from 'clsx'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import EZ from 'shared/assets/emotes/EZ.png'
import Money from 'shared/assets/emotes/money.gif'
import { DAIcon, StarIcon } from 'shared/assets/icons'
import { useElementSize } from 'shared/lib/hooks'
import { useToast } from 'shared/lib/hooks'
import { Banner, Button, ButtonIcon, ButtonText, CopiedText } from 'shared/ui'
import styles from './ads.module.scss'

interface AdsProps {
    donationAlertsLink: string
    className?: string
}

export const Ads = ({ donationAlertsLink, className }: AdsProps) => {
    const { t } = useTranslation()
    const toastTools = useToast()!
    const adsRef = useRef<HTMLDivElement>(null)
    const { width } = useElementSize(adsRef)

    return (
        <div
            ref={adsRef}
            className={clsx(
                styles.ads,
                width > 650 && width < 1200 && styles.adsCompact,
                width <= 650 && styles.adsSmall,
                className,
            )}
        >
            <Banner className={styles.banner} style="secondary">
                <img className={styles.bannerEmote} src={Money} alt="Money" />
                <span className={styles.bannerText}>{t('support-streamer')}</span>
                <Button className={styles.bannerBth} onClick={() => window.open(donationAlertsLink)}>
                    <ButtonIcon>
                        <DAIcon height="19px" width="17px" />
                    </ButtonIcon>
                    <ButtonText>{t('support-streamer-bth') ?? ''}</ButtonText>
                </Button>
            </Banner>
            <Banner className={styles.banner}>
                <img className={styles.bannerEmote} src={EZ} alt="EZ" />
                <span className={styles.bannerText}>{t('connect-bot')}</span>
                <Button
                    className={styles.bannerBth}
                    onClick={() => {
                        if (toastTools) {
                            toastTools.addToast(
                                {
                                    title: t('connect-bot-bth') ?? '',
                                    children: (
                                        <span className={styles.toastText}>
                                            {t('connect-bot-text-1')}
                                            <CopiedText>Urbinholt</CopiedText>
                                            {t('connect-bot-text-2')}
                                        </span>
                                    ),
                                },
                                { position: 'bottom' },
                            )
                        }
                    }}
                >
                    <ButtonIcon>
                        <StarIcon height="18px" width="20px" />
                    </ButtonIcon>
                    <ButtonText>{t('connect-bot-bth') ?? ''}</ButtonText>
                </Button>
            </Banner>
        </div>
    )
}
