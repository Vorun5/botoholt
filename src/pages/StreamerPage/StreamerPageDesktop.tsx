import styles from "./StreamerPage.module.css";
import {useTranslation} from "react-i18next";
import Bloc from "../../components/Bloc/Bloc";
import {StreamerCard} from "../../components/StreamerCard/StreamerCard";
import {Streamer} from "../../models/Streamer";
import LinkButton from "../../components/Buttons/LinkButton";
import {Route, Routes, useLocation, useSearchParams} from "react-router-dom";
import SongCard from "../../components/SongCard/SongCard";
import CreateWith from "../../components/CreateWith/CreateWith";
import Ad from "../../components/Ad/Ad";
import {useEffect, useState} from "react";
import ApiService from "../../services/ApiService";
import {StreamerQueue} from "../../models/StreamerQueue";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../NotFoundPage/ErrorPage";
import QueueList from "../../components/StreamerLists/QueueList";
import HistoryList from "../../components/StreamerLists/HistoryList";
import {ALL_AVAILABLE_PERIODS, Period} from "../../types";
import TopSongList from "../../components/StreamerLists/TopSongs";
import TopDJs from "../../components/StreamerLists/TopDJs";
import Button from "../../components/Buttons/Button";
import SocialMedias from "../../components/SocialMedias/SocialMedias";

interface StreamerPageDesktopProps {
    streamer: Streamer;
}

// const socialMedias = [
//     {
//         id: "9d05deec-9483-43da-8078-3255347e3df5",
//         name: "twitch",
//         title: "dasd",
//         url: "https://www.twitch.tv/vorun5",
//     },
//     {
//         id: "06f9fdaa-fa7a-41c4-8927-516486247aed",
//         name: "yandex",
//         title: "asd",
//         url: "https://music.yandex.ru/home",
//     },
//     {
//         id: "ca780caf-208e-4967-be01-e3e9187de5f2",
//         name: "instagram",
//         title: "inst",
//         url: "https://www.instagram.com/yikesvwv/",
//     },
//     {
//         id: "68bd00ad-8772-4f24-b882-45a32a3f8254",
//         name: "t",
//         title: "тегешечка",
//         url: "https://t.me/vorun",
//     },
//     {
//         id: "fb15e1c6-cba2-4abf-8a8e-e891b8e93898",
//         name: "telegram",
//         title: "тегешечка 2",
//         url: "https://telegram.me/vorun",
//     },
//     {
//         id: "ca780caf-208e-4967-be01-e3e9187de5f2",
//         name: "instagram",
//         title: "inst",
//         url: "https://www.instagram.com/yikesvwv/",
//     },
//     {
//         id: "439f4b46-8f51-4efb-a382-aa303b755093",
//         name: "github",
//         title: "d",
//         url: "https://github.com/Vorun5",
//     },
//     {
//         id: "2ecb6508-f729-4675-8610-79ae9246906e",
//         name: "facebook",
//         title: "sd",
//         url: "https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2Fzuck%2F",
//     },
//     {
//         id: "f165fb9c-b2f0-404c-86d5-78285465ec55",
//         name: "donationalerts",
//         title: "da",
//         url: "https://www.donationalerts.com/r/smurf__tv",
//     },
//     {
//         id: "c7ebe354-9306-41e0-a505-36a24aa57c3d",
//         name: "vk",
//         title: "vk",
//         url: "https://vk.com/firdavsi.nurov",
//     },
//     {
//         id: "fc4fc446-10e7-4c4e-b5b5-af0e6576d9a2",
//         name: "op",
//         title: "опгг",
//         url: "https://www.op.gg/summoners/euw/dn1she",
//     },
//     {
//         id: "6de1e84b-d44e-4408-b699-53891045f693",
//         name: "youtube",
//         title: "ютубе",
//         url: "https://www.youtube.com/watch?v=AeH-Z80EwXk",
//     },
//     {
//         id: "37ff3d73-6690-4bc9-94ad-f29b15628874",
//         name: "discord",
//         title: "дискорде",
//         url: "https://discord.com/invite/RffWQkztu6",
//     },
// ]

const StreamerPageDesktop = ({streamer}: StreamerPageDesktopProps) => {
    const {t} = useTranslation();

    const [searchParams, setSearchParams] = useSearchParams();
    const getPeriodFromSearchParams = () => {
        const searchPeriod = searchParams.get("period");
        if (searchPeriod == null || !ALL_AVAILABLE_PERIODS.includes(searchPeriod)) {
            return "week";
        }

        return searchPeriod as Period;
    }

    const [error, setError] = useState(false);
    const [queue, setQueue] = useState<StreamerQueue | null>(null);
    const [period, setPeriod] = useState<Period>(getPeriodFromSearchParams());
    const location = useLocation();


    useEffect(() => {
        document.title = `${streamer.display_name} - Botoholt`;
        setPeriod(getPeriodFromSearchParams());
        getQueue();
        setError(false);
    }, [streamer]);


    useEffect(() => {
        setPeriod(getPeriodFromSearchParams());
    }, [searchParams]);

    const getQueue = () => {
        ApiService.getStreamerQueue(streamer.login)
            .then((response) => {
                setQueue(response.data);
                setError(false);
            })
            .catch((e) => {
                console.log(e);
                setError(true);
            })
    }

    const checkLocation = (path: string): boolean =>
        location.pathname.toLowerCase().includes(`/${streamer.login.toLowerCase()}${path}`);

    const changeLocation = (path: string): string =>
        `/${streamer.login.toLowerCase()}${path}`;


    if (error) return <ErrorPage text={t("streamer-page.not-have-songs", {login: streamer.display_name})}/>;

    if (queue == null) return <Loading/>;

    const isTopDJsTab = checkLocation("/top/djs");
    const isTopSongsTab = checkLocation("/top/songs");

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.info__main}>
                    <div className={styles.info__card}>
                        <StreamerCard streamer={streamer} title={t("streamer-card.title")}/>
                    </div>
                    <SocialMedias
                        socialMedias={[
                            {
                                id: "id",
                                name: "twitch",
                                title: "Twitch",
                                url: `https://twitch.com/${streamer.login}`,
                            },
                            ...streamer.socialMedias!
                        ]}
                    />
                </div>
                <CreateWith/>
            </div>
            <div className={styles.content}>
                <div className={styles.content__navigation}>
                    <div className={styles.navigation__tabs}>
                        <div>
                            <LinkButton
                                url={changeLocation("")}
                                isActive={
                                    location.pathname.toLowerCase() === "/" + streamer.login.toLowerCase()
                                    ||
                                    location.pathname.toLowerCase() === "/" + streamer.login.toLowerCase() + "/"
                                }
                                text={t("streamer-page.tabs.queue")}
                            />
                        </div>
                        <div>
                            <LinkButton
                                url={changeLocation("/h")}
                                isActive={checkLocation("/h")}
                                text={t("streamer-page.tabs.history")}
                            />
                        </div>
                        <div>
                            <LinkButton
                                url={changeLocation(`/top/djs`)}
                                isActive={isTopDJsTab}
                                text={t("streamer-page.tabs.top-djs")}
                            />
                        </div>
                        <div>
                            <LinkButton
                                url={changeLocation(`/top/songs`)}
                                isActive={isTopSongsTab}
                                text={t("streamer-page.tabs.top-songs")}
                            />
                        </div>
                    </div>
                    {(isTopSongsTab || isTopDJsTab) ?
                        <div className={styles.navigation__filters}>
                            <span className={styles.filters__title}>{t("streamer-page.filter")}</span>
                            <Bloc width="20px"/>
                            <div className={styles.filters__buttons}>
                                <div>
                                    <Button
                                        isActive={period === "week"}
                                        text={t("streamer-page.tabs.filters.week")}
                                        onClick={() => setSearchParams({period: "week"})}
                                    />
                                </div>
                                <div>
                                    <Button
                                        isActive={period === "month"}
                                        text={t("streamer-page.tabs.filters.month")}
                                        onClick={() => setSearchParams({period: "month"})}
                                    />
                                </div>
                                <div>
                                    <Button
                                        isActive={period === "alltime"}
                                        text={t("streamer-page.tabs.filters.all-time")}
                                        onClick={() => setSearchParams({period: "alltime"})}
                                    />
                                </div>
                            </div>
                        </div> : <></>}
                </div>
                <div className={styles.content__song}>
                    <SongCard
                        song={{
                            isPlaying: queue.isPlaying,
                            nowPlayingName: queue.nowPlayingName,
                            nowPlayingLink: queue.nowPlayingLink,
                            nowPlayingStartsFrom: queue.nowPlayingStartsFrom,
                            nowPlayingDuration: queue.nowPlayingDuration,
                            nowPlayingOwner: queue.nowPlayingOwner,
                        }}
                    />
                </div>
                <div className={styles.content__main}>
                    <div className={styles.main__board}>
                        <div className={styles.board__item}>
                            <Ad
                                text={t("support-streamer")}
                                bthIcon="/icons/da-hover.svg"
                                icon="/emotes/money.gif"
                                bthText={t("support-streamer-bth")}
                                adStyle="secondary"
                                bthOnClick={() => {
                                    window.open(streamer.daLink)
                                }}
                            />
                        </div>
                        <Bloc height="30px"/>
                        <div className={styles.board__item}>
                            <Ad
                                text={t("connect-bot")}
                                bthIcon="/icons/star-hover.svg"
                                icon="/emotes/EZ.png"
                                bthText={t("connect-bot-bth")}
                                adStyle="primary"
                                bthOnClick={() => {
                                    window.open("https://www.youtube.com/watch?v=UhvaUwtGyH4")
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.main__divider}/>
                    <div className={styles.main__list}>
                        <Routes>
                            <Route path="/" element={<QueueList items={queue.queueList}/>}/>
                            <Route path="/h" element={<HistoryList streamerLogin={streamer.login}/>}/>
                            <Route path="/top/djs" element={<TopDJs streamerLogin={streamer.login} period={period}/>}/>
                            <Route
                                path="/top/songs"
                                element={<TopSongList streamerLogin={streamer.login} period={period}/>}
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StreamerPageDesktop;
