import {useCallback, useEffect, useState} from "react";
import ApiService from "../services/ApiService";
import {useSearchParams} from "react-router-dom";
import {ALL_AVAILABLE_PERIODS, Period} from "../types";
import {StreamerQueue} from "../models/StreamerQueue";
import {Streamer} from "../models/Streamer";

const useStreamerPage = (streamer: Streamer) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [error, setError] = useState(false);
    const [queue, setQueue] = useState<StreamerQueue | null>(null);
    const [queueIsEmpty, setQueueIsEmpty] = useState(false);

    const getPeriodFromSearchParams = useCallback(() => {
        const searchPeriod = searchParams.get("period");
        if (searchPeriod == null || !ALL_AVAILABLE_PERIODS.includes(searchPeriod)) {
            return "week";
        }

        return searchPeriod as Period;
    }, [searchParams]);

    const [period, setPeriod] = useState<Period>(getPeriodFromSearchParams());

    useEffect(() => {
        document.title = `${streamer.display_name} - Botoholt`;
        setPeriod(getPeriodFromSearchParams());
        getQueue();
        setError(false);
    }, [getPeriodFromSearchParams, streamer]);

    useEffect(() => {
        setPeriod(getPeriodFromSearchParams());
    }, [getPeriodFromSearchParams, searchParams]);

    const updateQueue = useCallback(() => {
        ApiService.getStreamerQueue(streamer.login)
            .then((response) => {
                setQueue(response.data);
                setQueueIsEmpty(response.data.queueList.length === 0);
                setError(false);
            })
            .catch((e) => console.log(e))
    }, [streamer.login]);

    const getQueue = useCallback(() => {
        ApiService.getStreamerQueue(streamer.login)
            .then((response) => {
                setQueue(response.data);
                setQueueIsEmpty(response.data.queueList.length === 0);
                setError(false);
            })
            .catch((e) => {
                console.log(e);
                setError(true);
            })
    }, [streamer.login]);




    useEffect(() => {
        const timerID = setInterval(() => {
            updateQueue();
        }, 15000);
        return () => clearInterval(timerID);
    }, [updateQueue]);

    return {error, queue, queueIsEmpty, period, setSearchParams}
}

export default useStreamerPage;
