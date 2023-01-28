import {StreamerCard} from "../../components/StreamerCard/StreamerCard";
import {StreamerPageProps} from "./common";
import {useTranslation} from "react-i18next";
import {Route, Routes, useLocation} from "react-router-dom";
import useStreamerPage from "../../hooks/useStreamerPage";
import ErrorPage from "../NotFoundPage/ErrorPage";
import Loading from "../../components/Loading/Loading";
import SocialMedias from "../../components/SocialMedias/SocialMedias";
import SongCard from "../../components/SongCard/SongCard";
import styles from "./StreamerPage.module.css";
import LinkButton from "../../components/Buttons/LinkButton";
import Bloc from "../../components/Bloc/Bloc";
import Button from "../../components/Buttons/Button";
import QueueList from "../../components/StreamerLists/QueueList";
import HistoryList from "../../components/StreamerLists/HistoryList";
import TopDJs from "../../components/StreamerLists/TopDJs";
import TopSongList from "../../components/StreamerLists/TopSongs";
import Ad from "../../components/Ad/Ad";
import CreateWith from "../../components/CreateWith/CreateWith";

const StreamerPageMobile = ({streamer}: StreamerPageProps) => {
    const {t} = useTranslation();
    const location = useLocation();

    const checkLocation = (pathname: string, str: string): boolean =>
        pathname.toLowerCase().includes(`/${streamer.login.toLowerCase()}${str}`);
    const changeLocation = (str: string): string =>
        `/${streamer.login.toLowerCase()}${str}`;

    const {error, queue, period, setSearchParams} = useStreamerPage(streamer);

    if (error) return <ErrorPage text={t("streamer-page.not-have-songs", {login: streamer.display_name})}/>;

    if (queue == null) return <Loading/>;

    const isTopDJsTab = checkLocation(location.pathname, "/top/djs");
    const isTopSongsTab = checkLocation(location.pathname, "/top/songs");

    return (
        <div>

            <StreamerCard streamer={streamer} title={t("streamer-card.title")}/>
            <SocialMedias socialMedias={[
                {
                    id: "id",
                    name: "twitch",
                    title: "Twitch",
                    url: `https://twitch.com/${streamer.login}`,
                },
                ...streamer.socialMedias!
            ]}/>
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
                        isActive={checkLocation(location.pathname, "/h")}
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
            <Bloc height="24px"/>

            <div className={styles.board_mobile}>
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
                <Bloc width="24px" height="24px"/>
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
            <Bloc height="24px"/>
            <CreateWith/>
        </div>
    );
}

export default StreamerPageMobile;
