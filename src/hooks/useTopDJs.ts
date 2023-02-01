import {useEffect, useState} from "react";
import ApiService from "../services/ApiService";
import {Period} from "../types";
import TopDJ from "../models/TopDJ";

const useTopDJs = (streamerLogin: string, period: Period) => {
    const [topDJs, setTopDJs] = useState<Array<TopDJ>>([]);
    const [loading, setLoading] = useState(true);
    const [topDJsIsEmpty, setTopDJsIsEmpty] = useState(false);

    const getHistory = () => {
        ApiService.getStreamerTopDJs(streamerLogin, period)
            .then((response) => {
                setTopDJs(response.data);
                setTopDJsIsEmpty(response.data.length === 0);
                setLoading(false);
            })
            .catch((e) => console.log(e))
    }

    useEffect(() => {
        setLoading(true);
        getHistory();
    }, [streamerLogin, period]);

    return {topDJs, loading, topDJsIsEmpty};
}

export default useTopDJs;
