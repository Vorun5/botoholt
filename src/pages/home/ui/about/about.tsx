import { useTranslation } from 'react-i18next'
import { CopiedText } from 'shared/ui'
import styles from './about.module.scss'

export const About = () => {
    const { t } = useTranslation()

    return (
        <div className={styles.about}>
            <h1 className={styles.aboutTitle}>{t('about-botoholt')}</h1>
            <p className={styles.aboutText}>
                <span className={styles.aboutIndent} />
                {t('about-botoholt-text-1')}
                <br /> <span className={styles.aboutIndent} /> {t('about-botoholt-text-2')}
                <CopiedText>Urbinholt#0640</CopiedText>
                {t('about-botoholt-text-3')}
            </p>
        </div>
    )
}
