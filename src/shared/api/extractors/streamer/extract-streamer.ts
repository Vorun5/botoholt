import { StreamerDto } from 'shared/api'
import { Streamer } from 'shared/types'
import { extractStreamInfo } from './extract-stream-info'
import { extractStreamerSocialMedias } from './extract-streamer-social-medias'

export const extractStreamer = (streamer: StreamerDto): Streamer => ({
    login: streamer.login,
    name: streamer.display_name,
    description: streamer.description,
    donationAlerts: streamer.daLink,
    followers: streamer.followersCount,
    image: streamer.profile_image_url,
    backgroundImage: streamer.offline_image_url,
    type: streamer.broadcaster_type,
    socialMedias:
        streamer.socialMedias && streamer.socialMedias.length
            ? extractStreamerSocialMedias(streamer.socialMedias)
            : null,
    streamInfo: streamer.streamInfo ? extractStreamInfo(streamer.streamInfo) : null,
})
