import { AllPossibleCustomCommandType, QueryKeys } from 'shared/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { addCustomCommand } from '../api/add-custom-command'

export const useAdminCustomCommandsAddMutation = () => {
    const client = useQueryClient()
    return useMutation({
        mutationFn: addCustomCommand,
        onSuccess: (newCommand) => {
            client.setQueriesData<AllPossibleCustomCommandType[]>([QueryKeys.adminCustomCommands], (commands) => {
                if (!commands) return [newCommand]
                return [newCommand, ...commands]
            })
            client.invalidateQueries({
                queryKey: [QueryKeys.adminCustomCommands],
                refetchType: 'none',
            })
        },
    })
}
