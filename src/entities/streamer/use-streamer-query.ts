import { QueryKeys } from 'shared/types'
import { useQuery } from '@tanstack/react-query'

import { getStreamer } from './get-streamer'

export const useStreamerQuery = (login: string) => {
    return useQuery({
        queryFn: () => getStreamer(login),
        queryKey: [QueryKeys.streamer(login)]
    })
}
