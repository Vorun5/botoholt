import { CommandAccess } from './command-access'
import { CommandType } from './command-type'

export interface Command {
    status: boolean
    type: CommandType
    commands: string[]
    answer: string
    access: CommandAccess
    cdInSeconds: number
}
