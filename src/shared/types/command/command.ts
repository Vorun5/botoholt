import { CommandType } from './command-type'

export interface Command {
    enabled: boolean
    function: CommandType
    aliases: string[]
    cooldown: number
}
