import { StreamerPageTab } from 'widgets/song-list'
import { Period, Streamer } from 'shared/types'

export interface StreamerPageProps {
    tab: StreamerPageTab
    period: Period
    streamer: Streamer
}
