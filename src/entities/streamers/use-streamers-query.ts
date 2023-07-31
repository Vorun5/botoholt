import { QueryKeys } from 'shared/types'
import { useQuery } from '@tanstack/react-query'

import { getAllStreamers } from './get-all-streamers'
import { sortStreamers } from './sort-streamers'

export const useStreamersQuery = () => {
    return useQuery({
        queryFn: async () => {
            const streamers = await getAllStreamers()
            
            return sortStreamers(streamers)
        },
        queryKey: [QueryKeys.streamers],
        // staleTime: 1000 * 5,
    })
}
