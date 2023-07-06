import { LastSongCommand } from './last-song-command'
import { QueueCommand } from './queue-command'
import { SongCommand } from './song-command'
import { WhichCommand } from './which-command'

export type Commands = (SongCommand | LastSongCommand | QueueCommand | WhichCommand)[]
