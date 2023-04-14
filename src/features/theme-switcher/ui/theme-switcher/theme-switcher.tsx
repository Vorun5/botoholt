import { useTranslation } from 'react-i18next'
import { useTheme } from '../../lib/useTheme'
import { ReactComponent as MoonIcon } from '../icons/moon.svg'
import { ReactComponent as SunIcon } from '../icons/sun.svg'
import styles from './theme-switcher.module.scss'

export const ThemeSwitcher = () => {
    const { t } = useTranslation()
    const [theme, handleChange] = useTheme()

    const iconSize = {
        width: 32,
        height: 32,
    }

    return (
        <button
            type="button"
            className={styles.themeSwitcher}
            onClick={() => handleChange(theme === 'dark' ? 'light' : 'dark')}
        >
            <span className={styles.themeLabel}>{t('header.change-theme')}</span>
            {theme === 'dark' ? <MoonIcon {...iconSize} /> : <SunIcon {...iconSize} />}
        </button>
    )
}
