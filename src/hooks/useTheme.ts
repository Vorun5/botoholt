import {useEffect, useState} from 'react';

type Theme = 'dark' | 'light'
const THEMES = ['dark', 'light'];

type useThemeReturn = [Theme, (theme: Theme) => void];

export const useTheme = (): useThemeReturn => {
    const localTheme = localStorage.getItem('theme') ?? 'dark';
    const [theme, setTheme] = useState<Theme>(THEMES.includes(localTheme) ? localTheme as Theme : 'dark')

    const handleChange = (theme: Theme) => setTheme(theme);

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme])

    return [theme, handleChange]
}
