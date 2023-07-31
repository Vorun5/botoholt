import { Period, QueryKeys } from 'shared/types'
import { useQuery } from '@tanstack/react-query'

import { getStreamerTopDjs } from '../api/get-streamer-top-djs'

export const useStreamerTopDjsQuery = ({
    login,
    period,
    total,
    from,
}: {
    login: string
    period: Period
    total: number
    from: number
}) => {
    return useQuery({
        queryFn: () => getStreamerTopDjs(login, period, total, from),
        queryKey: [QueryKeys.streamerSongTopDjs(login), login, period, total, from],
    })
}
