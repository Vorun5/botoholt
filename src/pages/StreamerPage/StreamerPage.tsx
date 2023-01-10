import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Streamer} from "../../models/Streamer";
import ApiService from "../../services/ApiService";

const StreamerPage = () => {
    const {streamerLogin} = useParams();

    const [streamer, setStreamer] = useState<Streamer>();
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
        getSteamer();
    }, [streamerLogin]);

    const getSteamer = () => {
        ApiService.getStreamer(streamerLogin as string)
            .then((response) => {
                setStreamer(response.data[0]);
            })
            // .catch((e: AxiosError) => {
            //     console.log(e.response!.status);
            //     if (!e.response && e.response!.status === 404) {
            //         console.log("Этот стример не подлючён к Botholot");
            //     }
            // })
            .catch((e) => {
                console.log(e);
                setError(true);
            })
    }

    if (error) {
        return <div>Этот стример не подлючён к Botoholt</div>
    }

    return <div>
        {!streamer ? <div>Загрузка...</div> : <div>{streamer.profile_image_url}</div>}
    </div>
}

export default StreamerPage;
