import { QueryKeys } from 'shared/types'
import { useQuery } from '@tanstack/react-query'

import { getDaService } from '../api/get-da-service'

export const useDaServiceQeury = () => {
    return useQuery({
        queryFn: getDaService,
        queryKey: [QueryKeys.adminDaService],
        refetchOnWindowFocus: false
    })
}
