import { Command, Status } from 'shared/types'

export type CommandsSlice = {
    commandСhange: {
        status: Status
        error: string | null
    }
    error: string | null
    status: Status
    commands: Command[]
}
