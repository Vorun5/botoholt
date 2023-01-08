import  { useEffect, useState, ChangeEvent } from 'react';

type Theme = 'dark' | 'light'

type useThemeReturn = [ Theme, (e: ChangeEvent<HTMLInputElement>) => void ];

export const useTheme = (initialTheme:Theme): useThemeReturn => {

    const [theme, setTheme] = useState<Theme>(initialTheme)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setTheme(e.target.checked ? 'dark' : 'light')

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme])

    return [theme, handleChange]
}
