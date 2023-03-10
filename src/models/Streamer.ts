import { SocialMedia } from 'models/SocialMedia'
import StreamInfo from 'models/StreamInfo'

export type BroadcasterType = 'affiliate' | 'partner' | ''

export interface Streamer {
    login: string
    display_name: string
    broadcaster_type: BroadcasterType
    profile_image_url: string
    view_count: number
    streamInfo?: StreamInfo
    description: string
    daLink: string
    followersCount: number
    socialMedias: SocialMedia[] | null
}
