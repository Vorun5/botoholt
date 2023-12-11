import { Command } from './command'

export interface SongCommand extends Command {
    answers: {
        daAnswers: {
            success: {
                answers: string[]
                variables: string[]
            }
        }
        shazamAnswers: {
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

export function isSongCommand(command: Command): command is SongCommand {
    return command.function === 'bot.songs.songProcess'
}
