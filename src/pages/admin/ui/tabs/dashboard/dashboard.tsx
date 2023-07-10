import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { HyperinkIcon, StatusNotOkIcon, StatusOkIcon } from 'shared/assets/icons'
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
} from 'shared/ui'
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

export const Dashboard = ({ streamer }: DashboardProps) => {
    const { t } = useTranslation()

    useEffect(() => {
        window.document.title = t('admin-page.nav.dashboard')
    }, [])

    const stream = {
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        category: 'Just chatting',
    }
    const song = {
        name: 'Weeknd & Кино (Виктор Цой) — Закрой за мной дверь (Blinding Lights) Mashup by Openlabel',
        link: 'https://www.youtube.com/watch?v=I2fgSE2paT8',
        sender: 'БОМ БОМ & PITER PARKER',
    }

    return (
        <>
            <ALPageHeader>
                <span>{t('welcome')},</span> {streamer.name}
            </ALPageHeader>
            <ALPageContent className={styles.pageContent}>
                <div className={styles.statuses}>
                    <Card className={styles.status}>
                        <CardDescription style="green">{t('admin-page.dashboard.bot-status')}</CardDescription>
                        <CardExpanded>
                            <CardTitle className={styles.statusText}>
                                {t('admin-page.dashboard.bot-status-connected')}
                            </CardTitle>
                        </CardExpanded>
                        <div className={styles.statusButtons}>
                            <Button padding="big">
                                <ButtonText>{t('disable')!}</ButtonText>
                            </Button>
                            <Button style="green" borderRadius="50%" width="50px" height="50px" alignment="center">
                                <ButtonIcon margin="none">
                                    <StatusOkIcon />
                                </ButtonIcon>
                            </Button>
                        </div>
                    </Card>
                    <Card className={styles.status}>
                        <CardDescription style="red">{t('admin-page.dashboard.da-status')}</CardDescription>
                        <CardExpanded>
                            <CardTitle className={styles.statusText}>
                                {t('admin-page.dashboard.da-status-not-connected')}
                            </CardTitle>
                        </CardExpanded>
                        <div className={styles.statusButtons}>
                            <Button style="green" padding="big">
                                <ButtonText>{t('connect')!}</ButtonText>
                            </Button>
                            <Button style="red" borderRadius="50%" width="50px" height="50px" alignment="center">
                                <ButtonIcon margin="none">
                                    <StatusNotOkIcon />
                                </ButtonIcon>
                            </Button>
                        </div>
                    </Card>
                </div>
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
                <div className={styles.streamInfo}>
                    <Card style="blue" className={styles.streamInfoCard}>
                        <CardDescription style="blue">{t('admin-page.dashboard.stream.category')}</CardDescription>
                        <CardExpanded>
                            <CardTitle className={styles.streamInfoCardTitle} style="blue">
                                {stream.category}
                            </CardTitle>
                        </CardExpanded>
                        <CardDescription>{t('admin-page.dashboard.stream.title')}</CardDescription>
                        <span className={styles.streamInfoCardStreamTitle}>{stream.title}</span>
                    </Card>
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
                </div>
                <Card style="green" className={styles.song}>
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
                </Card>
            </ALPageContent>
        </>
    )
}
