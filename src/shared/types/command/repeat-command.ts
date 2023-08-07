import { Command } from './command'

export interface RepeatCommand extends Command {
    answers: string[]
}

export function isRepeatCommand(command: Command): command is RepeatCommand {
    if (command.function === 'bot.commands.repeat') return true
    return false
}
