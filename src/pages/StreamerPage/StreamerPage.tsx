import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Streamer} from "../../models/Streamer";
import ApiService from "../../services/ApiService";
import {AxiosError} from "axios";

const StreamerPage = () => {
    const {streamerLogin} = useParams();

    const [streamer, setStreamer] = useState<Streamer>();

    useEffect(() => {
        getSteamer();
    }, []);

    const getSteamer = () => {
        if (!streamer) {
            console.log("Пустота ебанная");
        }
        ApiService.getStreamer(streamerLogin as string)
            .then((response) => {
                setStreamer(response.data[0]);
            })
            .catch((e: AxiosError) => {
                console.log(e.response!.status);
                if (!e.response && e.response!.status === 404) {
                    console.log("Этот стример не подлючён к Botholot");
                }
            }).catch((e) => {
            console.log(e);
        })
    }

    return <div>
        {!streamer ? <div>Загрузка...</div> : <div>{streamer.profile_image_url}</div>}
    </div>
}

export default StreamerPage;
