import { api } from 'shared/api'
import { MODE } from 'shared/mode'
import { AdminLang } from 'shared/types'

export const setBotLang = async (lang: AdminLang) => {
    if (MODE === 'dev.') {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return lang
    }

    const response = await api.post('admin/lang', { json: { lang: lang } }).json<AdminLang>()
    return response
}
