import { api } from 'shared/api';
import { MODE } from 'shared/mode';

export const setBotoholtService = async () => {
    if (MODE === 'dev.') {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return true
    }

    const response = await api.get('admin/services/botoholt').json<{ message: string }>()
    return true
}
