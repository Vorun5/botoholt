import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Streamer} from "../../models/Streamer";
import ApiService from "../../services/ApiService";
import StreamerNotFoundPage from "../StreamerNotFoundPage/StreamerNotFoundPage";

const StreamerPage = () => {
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
    }

    if (error) {
        return <StreamerNotFoundPage login={streamerLogin as string}/>
    }

    return <div>
        {!streamer ? <div>Загрузка...</div> : <div>{streamer.profile_image_url}</div>}
    </div>
}

export default StreamerPage;
