import { CommandType } from './command-type'

export interface Command {
    _id: string
    enabled: boolean
    function: CommandType
    aliases: string[]
    cooldown: number
}
