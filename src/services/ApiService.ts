import http from "../http-common";
import {Streamer} from "../models/Streamer";

type Period = "month" | "week" | "alltime";

const getAllStreamers = () =>
    http.get<Array<Streamer>>("/v1/streams");

const getStreamer = (login: string) =>
    http.get<Array<Streamer>>(`/v1/streams/${login}`);

// TODO: type
const getStreamerQueue = (login: string) =>
    http.get<Array<Streamer>>(`/${login}/`);

// TODO: type
const getStreamerHistory = (login: string) =>
    http.get<Array<Streamer>>(`/v1/${login}/songs/`);

// TODO: type
const getStreamerTopSongs = (login: string, period: Period) =>
    http.get<Array<Streamer>>(`/v1/${login}/songs/top/${period}`);

// TODO: type
const getStreamerTopDjs = (login: string, period: Period) =>
    http.get<Array<Streamer>>(`/v1/${login}/songs/top/djs/${period}`);

const ApiService = {
    getAllStreamers,
    getStreamer,
    getStreamerQueue,
    getStreamerHistory,
    getStreamerTopDjs,
    getStreamerTopSongs,
};

export default ApiService;
