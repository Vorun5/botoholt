import http from 'http-common'
import { HistorySong } from 'models/HistorySong'
import { Streamer } from 'models/Streamer'
import { StreamerQueue } from 'models/StreamerQueue'
import TopDJ from 'models/TopDJ'
import TopSong from 'models/TopSong'

type Period = 'month' | 'week' | 'alltime'

const getAllStreamers = () => http.get<Array<Streamer>>('https://dev.bho.lt/api/v1/streams')

const getStreamer = (login: string) =>
    http.get<Array<Streamer>>(`https://dev.bho.lt/api/v1/streams/${login}`)

const getStreamerQueue = (login: string) => http.get<StreamerQueue>(`https://bho.lt/api/${login}/`)

const getStreamerHistory = (login: string) =>
    http.get<Array<HistorySong>>(`https://bho.lt/api/v1/${login}/songs/`)

const getStreamerTopSongs = (login: string, period: Period) =>
    http.get<Array<TopSong>>(`https://bho.lt/api/v1/${login}/songs/top/${period}`)

const getStreamerTopDJs = (login: string, period: Period) =>
    http.get<Array<TopDJ>>(`https://bho.lt/api/v1/${login}/songs/top/djs/${period}`)

const ApiService = {
    getAllStreamers,
    getStreamer,
    getStreamerQueue,
    getStreamerHistory,
    getStreamerTopDJs,
    getStreamerTopSongs,
}

export default ApiService
