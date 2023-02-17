import { QueueSong } from 'models/QueueSong'
import { Streamer } from 'models/Streamer'
import { Period } from 'types'

export interface RouteListProps {
    streamer: Streamer
    queueIsEmpty: boolean
    queue: QueueSong[]
    period: Period
}
