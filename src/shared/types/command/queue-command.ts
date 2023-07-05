import { Command } from './command'

export interface QueueCommand extends Command {
    answers: {
        daAnswers: {
            success: {
                answers: string[]
                variables: string[]
            }
            failure: {
                answers: string[]
                variables: string[]
            }
        }
    }
}

export function isQueueCommand(command: Command): command is QueueCommand {
    if (command.function === 'bot.songs.queueProcess') return true
    return false
}
