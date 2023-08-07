import { AllPossibleCustomCommandType, QueryKeys } from 'shared/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { setCustomCommand } from '../api/set-custom-command'

export const useAdminCustomCommandsMutation = () => {
    const client = useQueryClient()
    return useMutation({
        mutationFn: setCustomCommand,
        onSuccess: (newCommand) => {
            client.setQueriesData<AllPossibleCustomCommandType[]>([QueryKeys.adminCustomCommands], (commands) => {
                if (!commands) return [newCommand]
                return commands.map((command) => (command._id === newCommand._id ? newCommand : command))
            })
            client.invalidateQueries({
                queryKey: [QueryKeys.adminCustomCommands],
                refetchType: 'none',
            })
        },
    })
}
