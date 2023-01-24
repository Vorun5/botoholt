import {useEffect, useState} from "react";
import {HistorySong} from "../models/HistorySong";
import ApiService from "../services/ApiService";

// get streamer song history
const useHistory = (streamerLogin: string) => {
    const [history, setHistory] = useState<Array<HistorySong>>([]);

    const getHistory = () => {
        ApiService.getStreamerHistory(streamerLogin)
            .then((response) => setHistory(response.data))
            .catch((e) => console.log(e))
    }

    useEffect(() => getHistory(), [streamerLogin]);

    return {history};
}

export default useHistory;
