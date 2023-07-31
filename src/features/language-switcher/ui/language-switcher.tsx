import { useTranslation } from 'react-i18next'

import styles from './language-switcher.module.scss'

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation()
    const changeLanguage = (language: string) => i18n.changeLanguage(language)

    return (
        <button
            type="button"
            className={styles.languageSwitcher}
            onClick={() => changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')}
        >
            {i18n.language === 'ru' ? 'ENG' : 'RU'}
        </button>
    )
}
