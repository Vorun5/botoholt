import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        ns: 'translation',
        defaultNS: 'translation',
        backend: {
            // TODO: not working with slash in url. Fix it!
            // loadPath: 'src/shared/lib/i18n/locales/{{lng}}/{{ns}}.json',
            crossDomain: false,
            detection: {
                order: ['queryString', 'cookie'],
                cache: ['cookie'],
            },
        },
        interpolation: {
            escapeValue: false,
        },
        react: {
            bindI18nStore: 'languageChanged',
            useSuspense: true,
        },
    })

export default i18n
