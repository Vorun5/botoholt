import {useEffect, useState} from "react";
import ApiService from "../services/ApiService";
import {Period} from "../types";
import TopDJ from "../models/TopDJ";

const useTopDJs = (streamerLogin: string, period: Period) => {
    const [topDJs, setTopDJs] = useState<Array<TopDJ>>([]);

    const getHistory = () => {
        ApiService.getStreamerTopDJs(streamerLogin, period)
            .then((response) => setTopDJs(response.data))
            .catch((e) => console.log(e))
    }

    useEffect(() => getHistory(), [streamerLogin, period]);

    return {topDJs};
}

export default useTopDJs;
