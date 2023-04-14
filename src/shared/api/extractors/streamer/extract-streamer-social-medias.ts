import { StreamerSocialMediaDto } from 'shared/api'
import { StreamerSocialMedia } from 'shared/types'

export const extractStreamerSocialMedias = (streamerSocialMedias: StreamerSocialMediaDto[]): StreamerSocialMedia[] => {
    return streamerSocialMedias.map((streamerSocialMedia) => ({
        id: streamerSocialMedia.id,
        domain: streamerSocialMedia.name,
        title: streamerSocialMedia.title,
        url: streamerSocialMedia.url,
    }))
}
