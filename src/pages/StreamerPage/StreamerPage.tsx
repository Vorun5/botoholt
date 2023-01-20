import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Streamer} from "../../models/Streamer";
import ApiService from "../../services/ApiService";
import StreamerNotFoundPage from "../StreamerNotFoundPage/StreamerNotFoundPage";
import {useMediaQuery} from "react-responsive";
import StreamerPageDesktop from "./StreamerPageDesktop";
import StreamerPageTable from "./StreamerPageTable";
import StreamerPageMobile from "./StreamerPageMobile";

const StreamerPage = () => {
    const isDesktop = useMediaQuery({
        query: "(min-width: 1200px)"
    });
    const isTable = useMediaQuery({
        query: "(min-width: 900px)"
    });

    const {streamerLogin} = useParams();
    const [streamer, setStreamer] = useState<Streamer | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        setStreamer(null);
        setError(false);
        getSteamer();
    }, [streamerLogin]);

    const getSteamer = () => {
        ApiService.getStreamer(streamerLogin as string)
            .then((response) => setStreamer(response.data[0]))
            .catch((_) => setError(true));
    };

    if (error) return <StreamerNotFoundPage login={streamerLogin as string}/>;
    if (!streamer) return <div>Загрузка...</div>;
    if (isDesktop) return <StreamerPageDesktop streamer={streamer}/>;
    if (isTable) return <StreamerPageTable/>;

    return <StreamerPageMobile/>;
}

export default StreamerPage;
