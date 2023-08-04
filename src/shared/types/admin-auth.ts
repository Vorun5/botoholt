import { AdminServicesDto } from 'shared/api'

import { StreamerType } from './streamer/streamer-type'
import { AdminLang } from './admin-lang'

export interface AdminAuth {
    login: string
    name: string
    type: StreamerType
    image: string
    description: string
    email: string
    created: string
    services: AdminServicesDto
    lang: AdminLang
}
