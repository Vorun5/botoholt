import { QueryKeys } from 'shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { setBotLang } from '../api/set-bot-lang';

export const useBotLangMutation = () => {
    const client = useQueryClient()

    return useMutation({
        mutationFn: setBotLang,
        onSuccess: () => {
            client.invalidateQueries([QueryKeys.admin]);
        },
    })
}
