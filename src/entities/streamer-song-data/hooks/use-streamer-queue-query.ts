import { QueryKeys } from 'shared/types'
import { useQuery } from '@tanstack/react-query'

import { getStreamerQueue } from '../api/get-streamer-queue'

export const useStreamerQueueQuery = (login: string) => {
    return useQuery({
        queryFn: () => getStreamerQueue(login),
        queryKey: [QueryKeys.streamerSongQueue(login), login],
    })
}
