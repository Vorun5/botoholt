import { useTranslation } from 'react-i18next'
import { ReactComponent as MoonIcon } from 'shared/assets/icons/moon.svg'
import { ReactComponent as SunIcon } from 'shared/assets/icons/sun.svg'
import { useTheme } from '../lib/useTheme'
import styles from './theme-switcher.module.scss'

export const ThemeSwitcher = ({ short = false }: { short?: boolean }) => {
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
            {!short && <span className={styles.themeLabel}>{t('header.change-theme')}</span>}
            {theme === 'dark' ? <MoonIcon {...iconSize} /> : <SunIcon {...iconSize} />}
        </button>
    )
}
