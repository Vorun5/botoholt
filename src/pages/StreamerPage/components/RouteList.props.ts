import { Streamer } from 'models/Streamer'
import { QueueSong } from 'models/QueueSong'
import { Period } from 'types'

export interface RouteListProps {
    streamer: Streamer
    queueIsEmpty: boolean
    queue: QueueSong[]
    period: Period
}
