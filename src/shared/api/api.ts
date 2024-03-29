import { MODE } from 'shared/mode'
import ky from 'ky'

export const apiUrl = new URL(`https:/${MODE}bho.lt/api/v1/`)

export const api = ky.create({
    prefixUrl: apiUrl,
    retry: {
        limit: 3,
        backoffLimit: 500,
    },
})
