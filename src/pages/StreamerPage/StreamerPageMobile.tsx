import {StreamerCard} from "../../components/StreamerCard/StreamerCard";
import {queueToSongPlaying, StreamerPageProps, streamerSocialMedias} from "./common";
import {useTranslation} from "react-i18next";
import useStreamerPage from "../../hooks/useStreamerPage";
import ErrorPage from "../NotFoundPage/ErrorPage";
import Loading from "../../components/Loading/Loading";
import SocialMedias from "../../components/SocialMedias/SocialMedias";
import SongCard from "../../components/SongCard/SongCard";
import Bloc from "../../components/Bloc/Bloc";
import CreateWith from "../../components/CreateWith/CreateWith";
import Navigation from "./components/Navigation";
import RouteList from "./components/RouteList";
import Ads from "./components/Ads";

const StreamerPageMobile = ({streamer}: StreamerPageProps) => {
    const {t} = useTranslation();
    const {error, queue, queueIsEmpty, period, setSearchParams} = useStreamerPage(streamer);

    if (error) return <ErrorPage text={t("streamer-page.not-have-songs", {login: streamer.display_name})}/>;
    if (queue == null) return <Loading/>;

    return (
        <>
            <StreamerCard streamer={streamer} title={t("streamer-card.title")}/>
            <SocialMedias socialMedias={streamerSocialMedias(streamer)}/>
            <SongCard song={queueToSongPlaying(queue)}/>
            <Navigation streamer={streamer} setSearchParams={setSearchParams} period={period}/>
            <RouteList queueIsEmpty={queueIsEmpty} period={period} streamer={streamer} queue={queue.queueList}/>
            <Bloc height="24px"/>
            <Ads daLink={streamer.daLink}/>
            <Bloc height="24px"/>
            <CreateWith/>
        </>
    );
}

export default StreamerPageMobile;
