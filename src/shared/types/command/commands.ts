import { LastSongCommand } from './last-song-command'
import { QueueCommand } from './queue-command'
import { SongCommand } from './song-command'
import { WhichCommand } from './which-command'

export type AllPossibleCommandType = SongCommand | LastSongCommand | QueueCommand | WhichCommand
