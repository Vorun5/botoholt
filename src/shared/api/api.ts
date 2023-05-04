import ky from 'ky'

export const api = ky.create({
    prefixUrl: 'https://dev.bho.lt/api/v1/',
    retry: {
        limit: 3,
        backoffLimit: 500,
    },
})
