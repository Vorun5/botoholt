import http from "../http-common";
import {Streamer} from "../models/Streamer";
import {StreamerQueue} from "../models/StreamerQueue";

type Period = "month" | "week" | "alltime";

const getAllStreamers = () =>
    http.get<Array<Streamer>>("https://dev.bho.lt/api/v1/streams");

const getStreamer = (login: string) =>
    http.get<Array<Streamer>>(`https://dev.bho.lt/api/v1/streams/${login}`);

const getStreamerQueue = (login: string) =>
    http.get<StreamerQueue>(`https://bho.lt/api/${login}/`);

// TODO: type
const getStreamerHistory = (login: string) =>
    http.get<Array<Streamer>>(`https://bho.lt/api/v1/${login}/songs/`);

// TODO: type
const getStreamerTopSongs = (login: string, period: Period) =>
    http.get<Array<Streamer>>(`https://bho.lt/api/v1/${login}/songs/top/${period}`);

// TODO: type
const getStreamerTopDjs = (login: string, period: Period) =>
    http.get<Array<Streamer>>(`https://bho.lt/api/v1/${login}/songs/top/djs/${period}`);

const ApiService = {
    getAllStreamers,
    getStreamer,
    getStreamerQueue,
    getStreamerHistory,
    getStreamerTopDjs,
    getStreamerTopSongs,
};

export default ApiService;
