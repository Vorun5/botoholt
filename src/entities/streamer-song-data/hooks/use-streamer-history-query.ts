import { QueryKeys } from 'shared/types';
import { useQuery } from '@tanstack/react-query';

import { getStreamerHistory } from '../api/get-streamer-history';

export const useStreamerHistoryQuery = ({ login, total, from }: { login: string; total: number; from: number }) => {
    return useQuery({
        queryFn: () => getStreamerHistory(login, total, from),
        queryKey: [QueryKeys.streamerSongHistory(login), login, total, from],
    })
}
