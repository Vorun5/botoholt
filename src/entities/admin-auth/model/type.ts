import { AdminAuth, Status } from 'shared/types';

export type AdminAuthSlice = {
    error: string | null
    status: Status
    auth: AdminAuth | null
}
