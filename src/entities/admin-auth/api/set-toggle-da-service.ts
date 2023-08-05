import { api } from 'shared/api'
import { MODE } from 'shared/mode'

export const setToogleDatService = async () => {
    if (MODE === 'dev.') {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return true
    }

    const response = await api.get('admin/services/donationalerts').json<{ message: string }>()
    return true
}
