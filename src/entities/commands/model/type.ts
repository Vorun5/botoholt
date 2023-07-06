import { Command, Status } from 'shared/types';

export type CommandsSlice = {
    error: string | null
    status: Status
    commands: Command[]
}
