import { clearStringFromSpaces } from 'shared/lib/helpers'
import { QueryKeys } from 'shared/types'
import { useQuery } from '@tanstack/react-query'

import { getStreamerHistory } from '../api/get-streamer-history'
import { PaginationParams } from '../api/pagination-params'

export const useStreamerHistoryQuery = ({
    login,
    limit,
    from,
    name,
    by,
}: PaginationParams & { name?: string; by?: string }) => {
    return useQuery({
        queryFn: () =>
            getStreamerHistory({
                login,
                limit,
                from,
                name: clearStringFromSpaces(name),
                by: clearStringFromSpaces(by),
            }),
        queryKey: [QueryKeys.streamerSongHistory(login), login, limit, from, name, by],
    })
}
