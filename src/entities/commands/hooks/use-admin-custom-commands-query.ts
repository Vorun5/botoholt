import { QueryKeys } from 'shared/types'
import { useQuery } from '@tanstack/react-query'

import { getCustomCommands } from '../api/get-custom-commands'

export const useAdminCustomCommandsQuery = () => {
    return useQuery({
        queryFn: getCustomCommands,
        queryKey: [QueryKeys.adminCustomCommands],
    })
}
