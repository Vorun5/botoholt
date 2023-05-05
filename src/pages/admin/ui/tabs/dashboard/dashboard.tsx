import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { HyperinkIcon, StatusNotOkIcon, StatusOkIcon } from 'shared/assets/icons'
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
    children?: string
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

export const Dashboard = () => {
    const { t } = useTranslation()

    useEffect(() => {
        window.document.title = t('admin-page.nav.dashboard')
    }, [])

    return (
        <>
            <ALPageHeader>
                <span>{t('welcome')},</span> Smurf_tv!
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
                    <CardDescription>смайлики канала</CardDescription>
                    <CardTitle>Топ смайликов</CardTitle>
                    <CardDescription textTransform="none">
                        Топ часто используемых BetterTTV, 7TV и FrankerFaceZ смайликов в чате
                    </CardDescription>
                    <CardDivider />
                    <CardExpanded>
                        <div className={styles.emotesTopWrapper}>
                            <TopEmotes emotes={emotes} />
                        </div>
                    </CardExpanded>
                </Card>
                <div className={styles.streamInfo}>
                    <Card style="blue" className={styles.streamInfoCard}>
                        <CardDescription style="blue">категория</CardDescription>
                        <CardExpanded>
                            <CardTitle className={styles.streamInfoCardTitle} style="blue">
                                League of Legends daksdk adksk aksd
                            </CardTitle>
                        </CardExpanded>
                        <CardDescription>название стрима</CardDescription>
                        <span>
                            GIGACHAD стрим! доигрываем мундо! постримим штрафной часок до 4 по мск! ЗАВТРА КОРЕЯ в 11 ПО
                            МСК
                        </span>
                    </Card>
                    <Card style="orange" className={styles.streamInfoCard}>
                        <CardDescription style="orange">15.03.2023 - 22.03.2023</CardDescription>
                        <div className={styles.streamInfoCardTitle}>
                            <CardTitle style="orange">Статистика</CardTitle>
                        </div>
                        <CardDescription>количество сообщений</CardDescription>
                        <CardTitle>32 414</CardTitle>
                        <CardDescription>заказано музыки за все время</CardDescription>
                        <CardTitle>1 231</CardTitle>
                    </Card>
                </div>
                <Card style="green" className={styles.song}>
                    <CardDescription style="green">Последняя заказанная песня</CardDescription>
                    <CardTitle style="green">
                        <a href="https://www.youtube.com/watch?v=I2fgSE2paT8" target="_blank">
                            Weeknd & Кино (Виктор Цой) — Закрой за мной дверь (Blinding Lights) Mashup by Openlabel
                        </a>
                    </CardTitle>
                    <CardExpanded>
                        <CardDescription className={styles.songSender}>
                            заказ от: бом бом & piter parker
                        </CardDescription>
                    </CardExpanded>
                    <CardFooter className={styles.songFooter}>
                        <HyperinkButton to="/admin/song-queue">Очередь</HyperinkButton>
                        <HyperinkButton to="/admin/song-queue">История песен</HyperinkButton>
                        <HyperinkButton to="/admin/song-queue">Топ диджеев</HyperinkButton>
                        <HyperinkButton to="/admin/song-queue">Топ песен</HyperinkButton>
                    </CardFooter>
                </Card>
            </ALPageContent>
        </>
    )
}
