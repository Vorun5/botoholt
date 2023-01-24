import styles from "./StreamerPage.module.css";
import {useTranslation} from "react-i18next";
import Bloc from "../../components/Bloc/Bloc";
import {StreamerCard} from "../../components/StreamerCard/StreamerCard";
import {Streamer} from "../../models/Streamer";
import LinkButton from "../../components/LinkButton/LinkButton";
import {Route, Routes, useLocation} from "react-router-dom";
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

interface StreamerPageDesktopProps {
    streamer: Streamer;
}

type Period = "week" | "month" | "alltime";

const StreamerPageDesktop = ({streamer}: StreamerPageDesktopProps) => {
    const {t} = useTranslation();
    const location = useLocation();
    const [error, setError] = useState(false);
    const [queue, setQueue] = useState<StreamerQueue | null>(null);
    const [period, setPeriod] = useState<Period>("week");
    useEffect(() => {
        setPeriod("week");
        getQueue();
        setError(false);
    }, [streamer]);

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

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div>
                    <div className={styles.info__card}>
                        <StreamerCard streamer={streamer} title={t("streamer-card.title")}/>
                    </div>
                    <div className={styles.info__links}></div>
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
                                url={changeLocation(`/top/djs/${period}`)}
                                isActive={checkLocation("/top/djs")}
                                text={t("streamer-page.tabs.top-djs")}
                            />
                        </div>
                        <div>
                            <LinkButton
                                url={changeLocation(`/top/songs/${period}`)}
                                isActive={checkLocation("/top/songs")}
                                text={t("streamer-page.tabs.top-songs")}
                            />
                        </div>
                    </div>
                    <div className={styles.navigation__filters}>
                        <span className={styles.filters__title}>
                            {t("streamer-page.filter")}
                        </span>
                        <Bloc width="20px"/>
                        <div className={styles.filters__buttons}>
                            <div>
                                <LinkButton
                                    url={changeLocation(`/top/djs/${period}`)}
                                    isActive={period === "week"}
                                    text={t("streamer-page.tabs.filters.week")}
                                />
                            </div>
                            <div>
                                <LinkButton
                                    url={changeLocation(`/top/djs/${period}`)}
                                    isActive={period === "month"}
                                    text={t("streamer-page.tabs.filters.month")}
                                />
                            </div>
                            <div>
                                <LinkButton
                                    url={changeLocation(`/top/djs/${period}`)}
                                    isActive={period === "alltime"}
                                    text={t("streamer-page.tabs.filters.all-time")}
                                />
                            </div>
                        </div>
                    </div>
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
                                bthIcon="../icons/da-hover.svg"
                                icon="../emotes/money.gif"
                                bthText={t("support-streamer-bth")}
                                style="secondary"
                                bthOnClick={() => {
                                    window.open(streamer.daLink)
                                }}
                            />
                        </div>
                        <Bloc height="30px"/>
                        <div className={styles.board__item}>
                            <Ad
                                text={t("connect-bot")}
                                bthIcon="../icons/star-hover.svg"
                                icon="../emotes/EZ.png"
                                bthText={t("connect-bot-bth")}
                                style="primary"
                                bthOnClick={() => {
                                    window.open("google.com")
                                }}
                            />
                        </div>
                    </div>

                    <div className={styles.main__divider}></div>

                    <div className={styles.main__list}>
                        <Routes>
                            <Route path="/" element={<QueueList items={queue.queueList}/>}/>
                            <Route path="/h" element={<HistoryList streamerLogin={streamer.login}/>}/>
                            <Route path="/top" element={
                                <div className={styles.list__title}>
                                    {location.pathname}
                                </div>
                            }/>
                        </Routes>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default StreamerPageDesktop;
