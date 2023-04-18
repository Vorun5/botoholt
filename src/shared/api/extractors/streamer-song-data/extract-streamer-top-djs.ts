import { StreamerTopDjDto } from 'shared/api'
import { StreamerTopDj } from 'shared/types'

export const extractStreamerTopDjs = (streamerTopDjs: StreamerTopDjDto[]): StreamerTopDj[] => {
    return streamerTopDjs.map((streamerTopDj) => ({
        name: streamerTopDj.requestedBy,
        amount: streamerTopDj.count,
    }))
}
