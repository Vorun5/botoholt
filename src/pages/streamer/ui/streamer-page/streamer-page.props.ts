import { StreamerPageTab } from "pages/streamer/lib/use-nav"
import { selectStreamer } from "entities/streamer-song-data"
import { Period } from "shared/types"

export interface StreamerPageProps {
    tab: StreamerPageTab
    period: Period
    streamer: ReturnType<typeof selectStreamer>
}