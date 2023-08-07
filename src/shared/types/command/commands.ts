import { Command } from './command'
import { CustomCommand } from './custom-command'
import { LastSongCommand } from './last-song-command'
import { QueueCommand } from './queue-command'
import { RepeatCommand } from './repeat-command'
import { SongCommand } from './song-command'
import { WhichCommand } from './which-command'

export type AllPossibleCommandType = SongCommand | LastSongCommand | QueueCommand | WhichCommand | Command
export type AllPossibleCustomCommandType = CustomCommand | RepeatCommand | Command
