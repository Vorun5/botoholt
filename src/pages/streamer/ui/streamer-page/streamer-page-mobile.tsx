import { Footer } from 'widgets/footer';
import { selectStreamer, CurrentSong } from 'entities/streamer-song-data';
import { StreamerCard } from 'entities/streamers';
import { PageContent } from 'shared/ui';
import { Ads } from '../ads/ads';
import { History } from '../history/history';
import { Queue } from '../queue/queue';

export const StreamerPageMobile = ({streamer} : {streamer: ReturnType<typeof selectStreamer>}) => {

    return (
        <>
            <PageContent>
                <StreamerCard streamer={streamer.data} />
                <CurrentSong />
                <Queue />
                <History />
                <Ads />
            </PageContent>
            <Footer />
        </>
    )
}
