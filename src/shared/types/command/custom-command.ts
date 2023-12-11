import { Command } from './command'

export interface CustomCommand extends Command {
    answers: string[]
}

export function isCustomCommand(command: Command): command is CustomCommand {
    return command.function === 'bot.commands.custom'
}
