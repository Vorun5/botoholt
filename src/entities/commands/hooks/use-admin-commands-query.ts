import { QueryKeys } from 'shared/types'
import { useQuery } from '@tanstack/react-query'

import { getCommands } from '../api/get-commands'

export const useAdminCommandsQuery = () => {
    return useQuery({
        queryFn: getCommands,
        queryKey: [QueryKeys.adminCommands],
    })
}
