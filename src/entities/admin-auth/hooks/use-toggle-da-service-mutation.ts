import { useToast } from 'shared/lib/hooks'
import { AdminAuth, QueryKeys } from 'shared/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { setToogleDatService } from '../api/set-toggle-da-service'

export const useToggleDaServiceMutation = () => {
    const client = useQueryClient()
    const toast = useToast()
    const { t } = useTranslation()

    return useMutation({
        mutationFn: setToogleDatService,
        onSuccess: () => {
            const auth = client.getQueryState<AdminAuth>([QueryKeys.admin])
            let message
            if (auth && auth.data) {
                message = auth.data.services.da_api
                    ? t('admin-page.integrations.da.unenable-success') ?? 'Unenable success'
                    : t('admin-page.integrations.da.enable-success') ?? 'Enable success'
            }
            if (message && toast) {
                toast.addToast({ text: message }, { status: 'success', delayInSeconds: 3, position: 'top-right' })
            }

            client.setQueriesData<AdminAuth>([QueryKeys.admin], (auth) => {
                if (auth) return { ...auth, services: { ...auth.services, da_api: !auth.services.da_api } }
                return auth
            })
            client.invalidateQueries({
                queryKey: [QueryKeys.admin],
                refetchType: 'none',
            })
        },
        onError: () => {
            const auth = client.getQueryState<AdminAuth>([QueryKeys.admin])
            let message
            if (auth && auth.data) {
                message = auth.data.services.da_api
                    ? t('admin-page.integrations.da.unenable-failed') ?? 'Unenable failed'
                    : t('admin-page.integrations.da.enable-failed') ?? 'Unenable failed'
            }
            if (message && toast) {
                toast.addToast({ text: message }, { status: 'error', delayInSeconds: 3, position: 'top-right' })
            }
        },
    })
}
