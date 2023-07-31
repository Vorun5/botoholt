import { Period, QueryKeys } from 'shared/types'
import { useQuery } from '@tanstack/react-query'

import { getStreamerTopSongs } from '../api/get-streamer-top-songs'

export const useStreamerTopSongQuery = ({
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
        queryFn: () => getStreamerTopSongs(login, period, total, from),
        queryKey: [QueryKeys.streamerSongTopSong(login), login, period, total, from],
    })
}
