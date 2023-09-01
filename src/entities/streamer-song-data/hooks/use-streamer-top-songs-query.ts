import { clearStringFromSpaces } from 'shared/lib/helpers'
import { Period, QueryKeys } from 'shared/types'
import { useQuery } from '@tanstack/react-query'

import { getStreamerTopSongs } from '../api/get-streamer-top-songs'
import { PaginationParams } from '../api/pagination-params'

export const useStreamerTopSongQuery = ({
    login,
    period,
    limit,
    from,
    name,
}: PaginationParams & {
    period: Period
    name?: string
}) => {
    return useQuery({
        queryFn: () => getStreamerTopSongs({ login, period, limit, from, name: clearStringFromSpaces(name) }),
        queryKey: [QueryKeys.streamerSongTopSong(login), login, period, limit, from, name],
    })
}
