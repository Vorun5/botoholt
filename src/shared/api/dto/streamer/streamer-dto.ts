import { StreamerType } from 'shared/types'

import { StreamInfoDto } from './stream-info-dto'
import { StreamerSocialMediaDto } from './streamer-social-media-dto'

export interface StreamerDto {
    login: string
    display_name: string
    broadcaster_type: StreamerType
    profile_image_url: string
    offline_image_url: string
    streamInfo?: StreamInfoDto
    channelInfo?: StreamInfoDto
    description: string
    daLink: string
    followersCount: number
    socialMedias: StreamerSocialMediaDto[] | null
}
