import { AdminAuthDto } from 'shared/api';
import { extractAdminAuth } from 'shared/api/extractors/extract-admin-auth';

export const getAuthData = async () => {
    const authDataDto: AdminAuthDto = {
        login: 'vorun5',
        display_name: 'Vorun5',
        broadcaster_type: '',
        description: 'If you need a remote front-end developer, then write to the twitch p.m',
        profile_image_url:
            'https://static-cdn.jtvnw.net/jtv_user_pictures/b74e0c86-709c-432a-9262-e1e5974a0fc9-profile_image-300x300.png',
        email: 'firdavsinurov326@gmail.com',
        created_at: '2020-10-03T18:45:02Z',
        services: {
            botoholt: true,
            da_api: true,
            pubsub: false,
        },
    }
    
    await new Promise(resolve => setTimeout(resolve, 200));
    return extractAdminAuth(authDataDto)
}
