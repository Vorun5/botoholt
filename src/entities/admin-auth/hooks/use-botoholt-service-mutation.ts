import { AdminAuth, QueryKeys } from 'shared/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { setBotoholtService } from '../api/set-botoholt-service'

export const useBotoholtServiceMutation = () => {
    const client = useQueryClient()
    
    return useMutation({
        mutationFn: setBotoholtService,
        onSuccess: () => {
            client.setQueriesData<AdminAuth>([QueryKeys.admin], (auth) => {
                if (auth) return { ...auth, services: { ...auth.services, botoholt: !auth.services.botoholt } }
                return auth
            })
            client.invalidateQueries({
                queryKey: [QueryKeys.admin],
                refetchType: 'none',
            })
        },
    })
}
