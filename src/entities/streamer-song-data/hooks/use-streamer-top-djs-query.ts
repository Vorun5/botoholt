import { clearStringFromSpaces } from 'shared/lib/helpers'
import { Period, QueryKeys } from 'shared/types'
import { useQuery } from '@tanstack/react-query'

import { getStreamerTopDjs } from '../api/get-streamer-top-djs'
import { PaginationParams } from '../api/pagination-params'

export const useStreamerTopDjsQuery = ({
    login,
    period,
    limit,
    from,
    by,
}: PaginationParams & {
    period: Period
    by?: string
}) => {
    return useQuery({
        queryFn: () => getStreamerTopDjs({ login, period, limit, from, by: clearStringFromSpaces(by) }),
        queryKey: [QueryKeys.streamerSongTopDjs(login), login, period, limit, from, by],
    })
}
