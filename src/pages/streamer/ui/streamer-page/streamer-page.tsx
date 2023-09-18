import { Footer, Header } from 'widgets'
import { useSongListNav } from 'widgets/song-list'
import { useStreamerQuery } from 'entities/streamer'
import { useMediaQuery } from 'shared/lib/hooks'
import { ErrorMessage, Loading, Page, PageContent, PageContentExpanded } from 'shared/ui'
import { useParams, useSearchParams } from 'react-router-dom'

import { StreamerPageDesktop } from './desktop/streamer-page-desktop'
import { StreamerPageMobile } from './mobile/streamer-page-mobile'

const StreamerPageLogic = () => {
    const searchParams = useSearchParams()
    // const 
    const { streamerName } = useParams()
    const login = (streamerName || '').toLocaleLowerCase()
    const { data: streamer, isLoading, isError, fetchStatus, isSuccess } = useStreamerQuery(login)
    const { tab, period, from, name, by } = useSongListNav(login, `/${login}`)

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
                    {isDesktop && (
                        <StreamerPageDesktop
                            tab={tab}
                            period={period}
                            streamer={streamer}
                            from={from}
                            searchStr=""
                            searchType="name"
                        />
                    )}
                    {isMobile && (
                        <StreamerPageMobile
                            tab={tab}
                            period={period}
                            streamer={streamer}
                            from={from}
                            searchStr=""
                            searchType="name"
                        />
                    )}
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
