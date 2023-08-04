import { AdminAuth } from 'shared/types'

import { AdminAuthDto } from '../dto'

export const extractAdminAuth = (adminAuth: AdminAuthDto): AdminAuth => ({
    created: adminAuth.created_at,
    description: adminAuth.description,
    email: adminAuth.email,
    image: adminAuth.profile_image_url,
    login: adminAuth.login,
    name: adminAuth.display_name,
    services: adminAuth.services,
    type: adminAuth.broadcaster_type,
    lang: adminAuth.lang
})
