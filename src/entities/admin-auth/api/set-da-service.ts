import { api } from 'shared/api'
import { MODE } from 'shared/mode'
import { AdminDaService } from 'shared/types'

export const setDaService = async (daService: AdminDaService) => {
    if (MODE === 'dev.') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        return daService
    }
    const response = await api.post('admin/donationalerts', { json: daService }).json<AdminDaService>()
    
    return response
}
