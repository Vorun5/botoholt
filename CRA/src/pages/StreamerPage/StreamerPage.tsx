import StreamerPageDesktop from './StreamerPageDesktop'
import StreamerPageMobile from './StreamerPageMobile'
import StreamerPageTable from './StreamerPageTable'
import Loading from 'components/Loading/Loading'
import { Streamer } from 'models/Streamer'
import ErrorPage from 'pages/NotFoundPage/ErrorPage'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import { useParams } from 'react-router-dom'
import ApiService from 'services/ApiService'
import { capitalize } from 'utils'

const StreamerPage = () => {
    const { t } = useTranslation()

    const isDesktop = useMediaQuery({ query: '(min-width: 1400px)' })
    const isTable = useMediaQuery({ query: '(min-width: 900px)' })

    const { streamerLogin } = useParams()
    const [streamer, setStreamer] = useState<Streamer | null>(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        setStreamer(null)
        setError(false)
        getSteamer()
    }, [streamerLogin])

    const getSteamer = () => {
        ApiService.getStreamer(streamerLogin as string)
            .then((response) => setStreamer(response.data[0]))
            .catch((_) => setError(true))
    }

    if (error)
        return (
            <ErrorPage
                text={t('streamer-not-found', {
                    login: capitalize(streamerLogin),
                })}
            />
        )

    if (!streamer) return <Loading />
    if (isDesktop) return <StreamerPageDesktop streamer={streamer} />
    if (isTable) return <StreamerPageTable streamer={streamer} />

    return <StreamerPageMobile streamer={streamer} />
}

export default StreamerPage
