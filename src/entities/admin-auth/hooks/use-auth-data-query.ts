import { QueryKeys } from 'shared/types'
import { useQuery } from '@tanstack/react-query'

import { getAuthData } from '../api/get-auth-data'

export const useAuthDataQeury = () => {
    return useQuery({
        queryFn: getAuthData,
        queryKey: [QueryKeys.admin],
    })
}
