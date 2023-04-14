import { StreamInfoDto } from 'shared/api'
import { StreamInfo } from 'shared/types'

export const extractStreamInfo = (streamInfo: StreamInfoDto): StreamInfo => ({
    category: streamInfo.game_name,
    title: streamInfo.title,
})
