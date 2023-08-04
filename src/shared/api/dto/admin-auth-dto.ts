import { AdminLang, StreamerType } from 'shared/types'

import { AdminServicesDto } from './admin-services-dto'

export interface AdminAuthDto {
    login: string
    display_name: string
    broadcaster_type: StreamerType
    description: string
    profile_image_url: string
    email: string
    created_at: string
    services: AdminServicesDto
    lang: AdminLang
}
