import clsx from 'clsx'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Connect } from 'shared/assets/icons/connection.svg'
import { ReactComponent as Note } from 'shared/assets/icons/note.svg'
import { ReactComponent as Support } from 'shared/assets/icons/support.svg'
import { useElementSize, useMediaQuery } from 'shared/lib/hooks'
import { InfoCard } from '../info-card/info-card'
import styles from './about-botoholt.module.scss'

export const AboutBotoholt = () => {
    const ref = useRef(null)
    const { width } = useElementSize(ref)
    const { t } = useTranslation()
    const isMobile = !useMediaQuery('(min-width: 420px)')

    return (
        <div ref={ref} className={clsx(styles.about, width < 1000 && styles.aboutCompact)}>
            <InfoCard mobile={isMobile} icon={<Note />} title={t('about.botoholt')}>
                {t('about.botoholt-text')}
            </InfoCard>
            <InfoCard mobile={isMobile} icon={<Connect />} title={t('about.connect')}>
                {t('about.connect-text')}
            </InfoCard>
            <InfoCard mobile={isMobile} icon={<Support />} title={t('about.support')}>
                {t('about.support-text')}
                <a href="https://fantalks.io/r/botoholt">{t('about.support-link-text')}</a>
            </InfoCard>
        </div>
    )
}
