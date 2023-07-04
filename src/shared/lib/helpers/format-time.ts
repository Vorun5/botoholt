import { TFunction } from 'i18next'

export const formatTime = (
    time: number,
    translation: TFunction<'translation', undefined, 'translation'>,
) => `${Math.floor(time! / 60)}${translation('minutes')} ${time! % 60}${translation('seconds')}`
