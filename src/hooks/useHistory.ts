import {useEffect, useState} from "react";
import {HistorySong} from "../models/HistorySong";
import ApiService from "../services/ApiService";

// get streamer song history
const useHistory = (streamerLogin: string) => {
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState<Array<HistorySong>>([]);

    const getHistory = () => {
        ApiService.getStreamerHistory(streamerLogin)
            .then((response) => {
                setHistory(response.data);
                setLoading(false);
            })
            .catch((e) => console.log(e))
    }

    useEffect(() => {
        setLoading(true);
        getHistory();
    }, [streamerLogin]);

    return {history, loading};
}

export default useHistory;
