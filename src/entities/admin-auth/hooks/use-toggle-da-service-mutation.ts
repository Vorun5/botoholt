import { AdminAuth, QueryKeys } from 'shared/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { setToogleDatService } from '../api/set-toggle-da-service'

export const useToggleDaServiceMutation = () => {
    const client = useQueryClient()
    return useMutation({
        mutationFn: setToogleDatService,
        onSuccess: () => {
            client.setQueriesData<AdminAuth>([QueryKeys.admin], (auth) => {
                if (auth) return { ...auth, services: { ...auth.services, da_api: !auth.services.da_api } }
                return auth
            })
            client.invalidateQueries({
                queryKey: [QueryKeys.admin],
                refetchType: 'none',
            })
        },
    })
}
