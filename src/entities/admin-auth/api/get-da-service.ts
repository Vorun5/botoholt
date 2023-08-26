import { api } from 'shared/api'
import { MODE } from 'shared/mode'
import { AdminDaService } from 'shared/types'

export const getDaService = async () => {
    if (MODE === 'dev.') {
        const daService: AdminDaService = {
            // daToken: "ncbEwKP53uOU326NLh02",
            // donationLink: 'https://www.donationalerts.com/r/vorun5'
            daToken: '',
            donationLink: '',
        }
        await new Promise((resolve) => setTimeout(resolve, 200))
        return daService
    }

    const response = await api.get('admin/donationalerts').json<AdminDaService>()

    return response
}
