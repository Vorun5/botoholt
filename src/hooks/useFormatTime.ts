import { useTranslation } from 'react-i18next'

const useFormatTime = (time: number) => {
    const { t } = useTranslation()

    return `${Math.floor(time! / 60)}${t('minutes')} ${time! % 60}${t('seconds')}`
}

export default useFormatTime
