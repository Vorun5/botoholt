import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { loadAuthData } from 'entities/admin-auth'
import { HyperinkIcon } from 'shared/assets/icons'
import { RootState, useAppDispatch } from 'shared/lib/store'
import { AdminAuth } from 'shared/types'
import { Loading, Page, PageContent, PageContentExpanded } from 'shared/ui'
import { ALPage, ALPageWrapper } from '../admin-layout/admin-layout'
import { NavigationBar } from '../navigation-bar/navigation-bar'
import { Commands, Dashboard, Integrations, NotFound, Songs, Support } from '../tabs'
import styles from './admin-page.module.scss'

export const AdminPage = () => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const auth = useSelector((state: RootState) => state.adminAuth)

    useEffect(() => {
        dispatch(loadAuthData())
    }, [])

    if (auth.status !== 'received')
        return (
            <Page>
                <PageContent>
                    <PageContentExpanded>
                        {auth.status === 'loading' && <Loading />}
                        {auth.status === 'rejected' && (
                            <div className={styles.notAuthorized}>
                                <span className={styles.notAuthorizedMessage}>Вы не авторизованы в Botoholt😪</span>
                                <br />
                                <span className={styles.login}>
                                    Чтобы авторизоваться перейдите{' '}
                                    <a href="/login" className={styles.loginLink}>
                                        на страницу авторизации <HyperinkIcon height="0.8rem" width="0.8rem" />
                                    </a>
                                </span>
                                <br />
                                {auth.error !== null && <span className={styles.notAuthorizedError}>{auth.error}</span>}
                            </div>
                        )}
                    </PageContentExpanded>
                </PageContent>
            </Page>
        )

    const authData: AdminAuth = {
        login: 'vorun5',
        name: 'Vorun5',
        type: '',
        description: 'If you need a remote front-end developer, then write to the twitch p.m',
        image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/b74e0c86-709c-432a-9262-e1e5974a0fc9-profile_image-300x300.png',
        email: 'firdavsinurov326@gmail.com',
        created: '2020-10-03T18:45:02Z',
        services: {
            botoholt: true,
            api: true,
            pubsub: false,
        },
    }

    if (auth.auth !== null)
        return (
            <ALPageWrapper>
                <NavigationBar authData={auth.auth} />
                <ALPage>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/commands" element={<Commands />} />
                        <Route path="/integrations" element={<Integrations />} />
                        <Route path="/songs/*" element={<Songs streamer={auth.auth} />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </ALPage>
            </ALPageWrapper>
        )

    return <></>
}
