import { AdminAuthDto, api } from 'shared/api'
import { extractAdminAuth } from 'shared/api/extractors/extract-admin-auth'

export const getAuthData = async () => {
    const response = await api.get('admin').json<AdminAuthDto>()

    return extractAdminAuth(response)
}
