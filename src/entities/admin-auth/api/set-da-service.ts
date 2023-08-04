import { AdminAuthDto, api } from 'shared/api'
import { MODE } from 'shared/mode'

export const setDaService = async () => {
    if (MODE === 'dev.') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        return true
    }
    const response = await api.get('admin/services/donationalerts').json<AdminAuthDto>()

    return true
}
