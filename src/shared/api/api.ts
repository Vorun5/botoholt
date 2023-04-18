import ky from 'ky'

export const api = ky.create({
    prefixUrl: 'https://bho.lt/api/v1/',
    retry: {
        limit: 3,
        backoffLimit: 500,
    },
})
