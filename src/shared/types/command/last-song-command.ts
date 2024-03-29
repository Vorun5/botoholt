import { Command } from './command'

export interface LastSongCommand extends Command {
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

export function isLastSongCommand(command: Command): command is LastSongCommand {
    return command.function === 'bot.songs.lastSong'
}
