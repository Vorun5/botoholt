import { useToast } from 'shared/lib/hooks'
import { AdminDaService, QueryKeys } from 'shared/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { setDaService } from '../api/set-da-service'

export const useDaServiceMutation = () => {
    const client = useQueryClient()
    const toast = useToast()
    const { t } = useTranslation()

    return useMutation({
        mutationFn: setDaService,
        onSuccess: (daService) => {
            client.setQueriesData<AdminDaService>([QueryKeys.adminDaService], () => daService)
            client.invalidateQueries({
                queryKey: [QueryKeys.admin],
            })
            if (toast)
                toast.addToast(
                    { children: t('link-saved') },
                    { status: 'success', delayInSeconds: 3, position: 'top-right' },
                )
        },
        onError: () => {
            if (toast)
                toast.addToast(
                    { children: t('try-again') },
                    { status: 'error', delayInSeconds: 3, position: 'top-right' },
                )
        },
    })
}
