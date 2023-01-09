import {useEffect, useState} from "react";
import {Streamer} from "../../models/Streamer";
import ApiService from "../../services/ApiService";

const HomePage = () => {
    const [streamers, setStreamers] = useState<Array<Streamer>>([]);

    useEffect(() => {
        getSteamers();
    }, []);

    const getSteamers = () => {
        ApiService.getAllStreamers()
            .then((response) => {
                setStreamers(response.data);
            })
            .catch((e) => {
                console.log(e);
            })
    }
    return <div>
        {streamers.length === 0
            ? <div>Загрузка...</div>
            : streamers.map((streamer) => <div key={streamer.login}>{streamer.login}</div>)
        }
    </div>
}

export default HomePage;
