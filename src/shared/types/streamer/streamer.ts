import { StreamInfo } from './stream-info'
import { StreamerSocialMedia } from './streamer-social-media'
import { StreamerType } from './streamer-type'

export interface Streamer {
    login: string
    name: string
    type: StreamerType
    image: string
    backgroundImage: string
    streamInfo: StreamInfo | null
    description: string
    donationAlerts: string
    followers: number
    socialMedias: StreamerSocialMedia[] | null
}
