import { AllPossibleCustomCommandType, QueryKeys } from 'shared/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteCustomCommand } from '../api/delete-custom-coomand'

export const useAdminCustomCommandsDeleteMutation = () => {
    const client = useQueryClient()
    return useMutation({
        mutationFn: deleteCustomCommand,
        onSuccess: (id) => {
            client.setQueriesData<AllPossibleCustomCommandType[]>([QueryKeys.adminCustomCommands], (commands) => {
                if (!commands) return []
                return commands.filter((command) => command._id !== id)
            })
            client.invalidateQueries({
                queryKey: [QueryKeys.adminCustomCommands],
                refetchType: 'none',
            })
        },
    })
}
