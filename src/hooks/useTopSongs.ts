import {useEffect, useState} from "react";
import ApiService from "../services/ApiService";
import {Period} from "../types";
import TopSong from "../models/TopSong";

const useTopSongs = (streamerLogin: string, period: Period) => {
    const [topSongs, setTopSongs] = useState<Array<TopSong>>([]);

    const getHistory = () => {
        ApiService.getStreamerTopSongs(streamerLogin, period)
            .then((response) => setTopSongs(response.data))
            .catch((e) => console.log(e))
    }

    useEffect(() => getHistory(), [streamerLogin, period]);

    return {topSongs};
}

export default useTopSongs;
