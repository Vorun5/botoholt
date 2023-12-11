import { Command } from './command'

export interface RepeatCommand extends Command {
    answers: string[]
}

export function isRepeatCommand(command: Command): command is RepeatCommand {
    return command.function === 'bot.commands.repeat'
}
