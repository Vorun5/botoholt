import { AllPossibleCommandType, QueryKeys } from 'shared/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { setCommand } from '../api/set-command'

export const useAdminCommandsMutation = () => {
    const client = useQueryClient()
    return useMutation({
        mutationFn: setCommand,
        onSuccess: (newCommand) => {
            client.setQueriesData<AllPossibleCommandType[]>([QueryKeys.adminCommands], (commands) => {
                if (!commands) return [newCommand]
                return commands.map((command) => (command._id === newCommand._id ? newCommand : command))
            })
            client.invalidateQueries({
                queryKey: [QueryKeys.adminCommands],
                refetchType: 'none',
            })
        },
    })
}
