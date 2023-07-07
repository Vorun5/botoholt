import { StreamerPageTab } from "pages/streamer/lib/use-nav"
import { Period, Streamer } from "shared/types"

export interface StreamerPageProps {
    tab: StreamerPageTab
    period: Period
    streamer: Streamer
}