import { useEffect } from 'react'
import { loadStreamer, selectStreamer } from 'entities/streamer'
import {
    loadStreamerHistorySongs,
    loadStreamerQueue,
    selectStreamerHistorySongs,
    selectStreamerQueue,
} from 'entities/streamer-song-data'
import { AdminServicesDto } from 'shared/api'
import { apiUrl } from 'shared/api/api'
import { HyperinkIcon, StatusNotOkIcon, StatusOkIcon } from 'shared/assets/icons'
import { useAppDispatch } from 'shared/lib/store'
import { AdminAuth } from 'shared/types'
import {
    Button,
    ButtonIcon,
    ButtonText,
    Card,
    CardDescription,
    CardDivider,
    CardExpanded,
    CardFooter,
    CardTitle,
    ErrorMessage,
} from 'shared/ui'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { io } from 'socket.io-client'

import { ALPageContent, ALPageHeader } from '../../admin-layout/admin-layout'
import { Emote, TopEmotes } from '../../top-emotes/top-emotes'

import styles from './dashboard.module.scss'

const emotes: Emote[] = [
    {
        name: 'LOLFORSENOMEGALULWHATKEKBRUHBRUHBRUHBRUHBRUHBRUHBRUH',
        number: 1,
        source: 'BetterTTV',
        url: 'https://cdn.betterttv.net/emote/5f899609473f4802fe47046f/2x.webp',
        amount: 95734,
    },
    {
        name: 'AYAYA',
        number: 2,
        source: 'FrankerFaceZ',
        url: 'https://cdn.frankerfacez.com/emoticon/162146/4',
        amount: 58348,
    },
    {
        name: 'Okayge',
        source: '7TV',
        url: 'https://cdn.7tv.app/emote/60bcb44f7229037ee386d1ab/2x.webp',
        number: 3,
        amount: 43294,
    },
    {
        name: 'catJam',
        number: 1,
        source: 'BetterTTV',
        url: 'https://cdn.betterttv.net/emote/5f899609473f4802fe47046f/2x.webp',
        amount: 95734,
    },
    {
        name: 'AYAYA',
        number: 2,
        source: 'FrankerFaceZ',
        url: 'https://cdn.frankerfacez.com/emoticon/162146/4',
        amount: 58348,
    },
    {
        name: 'Okayge',
        source: '7TV',
        url: 'https://cdn.7tv.app/emote/60bcb44f7229037ee386d1ab/2x.webp',
        number: 3,
        amount: 43294,
    },
    {
        name: 'catJam',
        number: 1,
        source: 'BetterTTV',
        url: 'https://cdn.betterttv.net/emote/5f899609473f4802fe47046f/2x.webp',
        amount: 95734,
    },
    {
        name: 'AYAYA',
        number: 2,
        source: 'FrankerFaceZ',
        url: 'https://cdn.frankerfacez.com/emoticon/162146/4',
        amount: 58348,
    },
    {
        name: 'Okayge',
        source: '7TV',
        url: 'https://cdn.7tv.app/emote/60bcb44f7229037ee386d1ab/2x.webp',
        number: 3,
        amount: 43294,
    },
    {
        name: 'catJam',
        number: 1,
        source: 'BetterTTV',
        url: 'https://cdn.betterttv.net/emote/5f899609473f4802fe47046f/2x.webp',
        amount: 95734,
    },
    {
        name: 'AYAYA',
        number: 2,
        source: 'FrankerFaceZ',
        url: 'https://cdn.frankerfacez.com/emoticon/162146/4',
        amount: 58348,
    },
    {
        name: 'Okayge',
        source: '7TV',
        url: 'https://cdn.7tv.app/emote/60bcb44f7229037ee386d1ab/2x.webp',
        number: 3,
        amount: 43294,
    },
    {
        name: 'catJam',
        number: 1,
        source: 'BetterTTV',
        url: 'https://cdn.betterttv.net/emote/5f899609473f4802fe47046f/2x.webp',
        amount: 95734,
    },
    {
        name: 'AYAYA',
        number: 2,
        source: 'FrankerFaceZ',
        url: 'https://cdn.frankerfacez.com/emoticon/162146/4',
        amount: 58348,
    },
    {
        name: 'Okayge',
        source: '7TV',
        url: 'https://cdn.7tv.app/emote/60bcb44f7229037ee386d1ab/2x.webp',
        number: 3,
        amount: 43294,
    },
    {
        name: 'catJam',
        number: 1,
        source: 'BetterTTV',
        url: 'https://cdn.betterttv.net/emote/5f899609473f4802fe47046f/2x.webp',
        amount: 95734,
    },
    {
        name: 'AYAYA',
        number: 2,
        source: 'FrankerFaceZ',
        url: 'https://cdn.frankerfacez.com/emoticon/162146/4',
        amount: 58348,
    },
    {
        name: 'Okayge',
        source: '7TV',
        url: 'https://cdn.7tv.app/emote/60bcb44f7229037ee386d1ab/2x.webp',
        number: 3,
        amount: 43294,
    },
]

interface HyperinkButtonProps {
    to: string
    children: string
}

export const HyperinkButton = ({ to, children }: HyperinkButtonProps) => {
    return (
        <Link to={to}>
            <Button>
                <ButtonText>{children}</ButtonText>
                <ButtonIcon margin="left">
                    <HyperinkIcon />
                </ButtonIcon>
            </Button>
        </Link>
    )
}

interface DashboardProps {
    streamer: AdminAuth
}

const StreamInfo = ({ login }: { login: string }) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const streamer = useSelector(selectStreamer)

    useEffect(() => {
        dispatch(loadStreamer(login))
    }, [dispatch, login])

    const stream = {
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        category: 'Just chatting',
    }

    return (
        <Card
            style="blue"
            className={styles.streamInfoCard}
            skeleton={streamer.status === 'loading'}
            s={{
                minHeight: '225px',
            }}
        >
            {streamer.status === 'rejected' && <ErrorMessage>{streamer.error}</ErrorMessage>}
            {streamer.status === 'received' && (
                <>
                    <CardDescription style="blue">{t('admin-page.dashboard.stream.category')}</CardDescription>
                    <CardExpanded>
                        <CardTitle className={styles.streamInfoCardTitle} style="blue">
                            {stream.category}
                        </CardTitle>
                    </CardExpanded>
                    <CardDescription>{t('admin-page.dashboard.stream.title')}</CardDescription>
                    <span className={styles.streamInfoCardStreamTitle}>{stream.title}</span>
                </>
            )}
        </Card>
    )
}

const LastOrderSong = ({ login }: { login: string }) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const queue = useSelector(selectStreamerQueue)
    const history = useSelector(selectStreamerHistorySongs)

    useEffect(() => {
        dispatch(loadStreamerQueue(login))
        dispatch(
            loadStreamerHistorySongs({
                login,
                from: 0,
                limit: 1,
            }),
        )
    }, [])

    useEffect(() => {
        const socket = io(apiUrl.origin, { path: `${apiUrl.pathname}socket`, autoConnect: true })

        socket.on('connect', () => {
            console.log('CONNECTED TO', login)
        })

        socket.emit('subscribe', login)

        socket.on('message', (data) => {
            if (data.channel === login) {
                console.log('UPDATE', data.channel)
                dispatch(loadStreamerQueue(data.channel))
                dispatch(
                    loadStreamerHistorySongs({
                        login,
                        from: 0,
                        limit: 1,
                    }),
                )
            }
        })

        return () => {
            socket.on('disconnect', () => {
                console.log('DISCONNECT', login)
            })

            socket.disconnect()
        }
    }, [login])
    let song = null
    if (queue.list.length !== 0) {
        song = queue.list[queue.list.length - 1]
    } else if (history.list.length !== 0) {
        song = history.list[0]
    }

    return (
        <Card
            style="green"
            className={styles.song}
            skeleton={queue.status === 'loading'}
            s={{
                minHeight: '225px',
            }}
        >
            {queue.status === 'rejected' && history.status === 'rejected' && <ErrorMessage>{queue.error}</ErrorMessage>}
            {song && (
                <>
                    <CardDescription style="green">{t('song-card.last-song')}</CardDescription>
                    <CardTitle style="green">
                        <a href={song.link} target="_blank">
                            {song.name}
                        </a>
                    </CardTitle>
                    <CardExpanded>
                        <CardDescription className={styles.songSender}>
                            {t('song-card.by')} {song.sender}
                        </CardDescription>
                    </CardExpanded>
                    <CardFooter className={styles.songFooter}>
                        <HyperinkButton to="/admin/songs">{t('streamer-page.tabs.queue')}</HyperinkButton>
                        <HyperinkButton to="/admin/songs/h">{t('streamer-page.tabs.history')}</HyperinkButton>
                        <HyperinkButton to="/admin/songs/top/djs">{t('streamer-page.tabs.top-djs')}</HyperinkButton>
                        <HyperinkButton to="/admin/songs/top/songs">{t('streamer-page.tabs.top-songs')}</HyperinkButton>
                    </CardFooter>
                </>
            )}
        </Card>
    )
}

const Statistic = () => {
    const { t } = useTranslation()

    return (
        <Card style="orange" className={styles.streamInfoCard}>
            <CardDescription style="orange">15.03.2023 - 22.03.2023</CardDescription>
            <div className={styles.streamInfoCardTitle}>
                <CardTitle style="orange">{t('admin-page.dashboard.statistic.title')}</CardTitle>
            </div>
            <CardDescription>{t('admin-page.dashboard.statistic.number-of-messages')}</CardDescription>
            <CardTitle>32 414</CardTitle>
            <CardDescription>{t('admin-page.dashboard.statistic.number-of-ordered-songs')}</CardDescription>
            <CardTitle>1 231</CardTitle>
        </Card>
    )
}

const Emotes = () => {
    const { t } = useTranslation()

    return (
        <Card className={styles.emotes}>
            <CardDescription>{t('top-emotes.channel-emotes')}</CardDescription>
            <CardTitle>{t('top-emotes.top-emotes')}</CardTitle>
            <CardDescription textTransform="none">{t('top-emotes.description')}</CardDescription>
            <CardDivider />
            <CardExpanded>
                <div className={styles.emotesTopWrapper}>
                    <TopEmotes emotes={emotes} />
                </div>
            </CardExpanded>
        </Card>
    )
}

const Services = ({ services }: { services: AdminServicesDto }) => {
    const { t } = useTranslation()

    return (
        <div className={styles.statuses}>
            <Card className={styles.status}>
                <CardDescription style={services.botoholt ? 'green' : 'red'}>
                    {t('admin-page.dashboard.bot-status')}
                </CardDescription>
                <CardExpanded>
                    <CardTitle className={styles.statusText}>
                        {t(`admin-page.dashboard.bot-status-${services.botoholt ? 'connected' : 'not-connected'}`)}
                    </CardTitle>
                </CardExpanded>
                <div className={styles.statusButtons}>
                    <Button padding="big">
                        <ButtonText>{t(services.botoholt ? 'disable' : 'connect')!}</ButtonText>
                    </Button>
                    <Button
                        style={services.botoholt ? 'green' : 'red'}
                        borderRadius="50%"
                        width="50px"
                        height="50px"
                        alignment="center"
                    >
                        <ButtonIcon margin="none">
                            {services.botoholt ? <StatusOkIcon /> : <StatusNotOkIcon />}
                        </ButtonIcon>
                    </Button>
                </div>
            </Card>
            <Card className={styles.status}>
                <CardDescription style={services.da_api ? 'green' : 'red'}>
                    {t('admin-page.dashboard.da-status')}
                </CardDescription>
                <CardExpanded>
                    <CardTitle className={styles.statusText}>
                        {t(`admin-page.dashboard.da-status-${services.da_api ? 'connected' : 'not-connected'}`)}
                    </CardTitle>
                </CardExpanded>
                <div className={styles.statusButtons}>
                    <Button padding="big">
                        <ButtonText>{t(services.da_api ? 'disable' : 'connect')!}</ButtonText>
                    </Button>
                    <Button
                        style={services.da_api ? 'green' : 'red'}
                        borderRadius="50%"
                        width="50px"
                        height="50px"
                        alignment="center"
                    >
                        <ButtonIcon margin="none">
                            {services.da_api ? <StatusOkIcon /> : <StatusNotOkIcon />}
                        </ButtonIcon>
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export const Dashboard = ({ streamer }: DashboardProps) => {
    const { t } = useTranslation()

    useEffect(() => {
        window.document.title = t('admin-page.nav.dashboard')
    }, [])

    return (
        <>
            <ALPageHeader>
                <span>{t('welcome')},</span> {streamer.name}
            </ALPageHeader>
            <ALPageContent className={styles.pageContent}>
                <Services services={streamer.services} />
                <Emotes />
                <div className={styles.streamInfo}>
                    <StreamInfo login={streamer.login} />
                    <Statistic />
                </div>
                <LastOrderSong login={streamer.login} />
            </ALPageContent>
        </>
    )
}
