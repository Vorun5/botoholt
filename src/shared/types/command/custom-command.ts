import { Command } from './command'

export interface CustomCommand extends Command {
    answers: string[]
}

export function isCustomCommand(command: Command): command is CustomCommand {
    if (command.function === 'bot.commands.custom') return true
    return false
}
