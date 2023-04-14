import { useSelector } from 'react-redux'
import { Footer } from 'widgets/footer'
import { selectStreamer, selectStreamerCurrentSong, CurrentSong } from 'entities/streamer-song-data'
import { StreamerCard } from 'entities/streamers'
import { Loading, PageContent } from 'shared/ui'
import { Ads } from '../ads/ads'
import { History } from '../history/history'
import { Queue } from '../queue/queue'

export const StreamerPageMobile = () => {
    const streamer = useSelector(selectStreamer)
    const currentSong = useSelector(selectStreamerCurrentSong)

    return (
        <>
            <PageContent>
                {/* TODO: перенести индикатор загрузки в CurrentSong */}
                {streamer.status === 'loading' && <Loading />}
                {streamer.status === 'rejected' && <span>Error!</span>}
                {streamer.status === 'received' && <StreamerCard streamer={streamer.data} />}
                <CurrentSong song={currentSong} />

                <Ads />
                <Queue />
                <History />
            </PageContent>
            <Footer />
        </>
    )
}
