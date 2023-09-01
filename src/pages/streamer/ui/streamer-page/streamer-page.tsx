import { Footer, Header } from 'widgets'
import { useSongListNav } from 'widgets/song-list'
import { useStreamerQuery } from 'entities/streamer'
import { useMediaQuery } from 'shared/lib/hooks'
import { ErrorMessage, Loading, Page, PageContent, PageContentExpanded } from 'shared/ui'
import { useParams } from 'react-router-dom'

import { StreamerPageDesktop } from './desktop/streamer-page-desktop'
import { StreamerPageMobile } from './mobile/streamer-page-mobile'

const StreamerPageLogic = () => {
    const { streamerName } = useParams()
    const login = (streamerName || '').toLocaleLowerCase()
    const { data: streamer, isLoading, isError, fetchStatus, isSuccess } = useStreamerQuery(login)
    const { tab, period, from } = useSongListNav(login, `/${login}`)

    const isDesktop = useMediaQuery('(min-width: 900px)')
    const isMobile = !isDesktop

    return (
        <>
            {isLoading && (
                <PageContentExpanded>
                    <Loading />
                </PageContentExpanded>
            )}
            {isError && (
                <PageContentExpanded>
                    <ErrorMessage>{`Error status: ${fetchStatus}`}</ErrorMessage>
                </PageContentExpanded>
            )}
            {isSuccess && (
                <>
                    {isDesktop && <StreamerPageDesktop tab={tab} period={period} streamer={streamer} from={from} />}
                    {isMobile && <StreamerPageMobile tab={tab} period={period} streamer={streamer} from={from} />}
                </>
            )}
        </>
    )
}

export const StreamerPage = () => {
    return (
        <Page>
            <Header />
            <PageContent>
                <StreamerPageLogic />
            </PageContent>
            <Footer />
        </Page>
    )
}
