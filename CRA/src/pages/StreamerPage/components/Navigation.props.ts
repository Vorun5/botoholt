import { Streamer } from 'models/Streamer'
import { Period } from 'types'

export interface NavigationProps {
    streamer: Streamer
    period: Period
    setSearchParams: any
}
