import { StreamerPageTab } from 'widgets/song-list'
import { Period, Streamer } from 'shared/types'

export interface StreamerPageProps {
    tab: StreamerPageTab
    from: number
    period: Period
    streamer: Streamer
}
