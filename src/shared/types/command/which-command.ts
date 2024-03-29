import { Command } from './command'

export interface WhichCommand extends Command {
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

export function isWhichCommand(command: Command): command is WhichCommand {
    return command.function === 'bot.songs.whichProcess'
}
