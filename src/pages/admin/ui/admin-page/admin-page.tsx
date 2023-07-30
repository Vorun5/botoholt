import { useEffect } from 'react'
import { loadAuthData } from 'entities/admin-auth'
import { HyperinkIcon } from 'shared/assets/icons'
import { RootState, useAppDispatch } from 'shared/lib/store'
import { Loading, Page, PageContent, PageContentExpanded } from 'shared/ui'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { ALPage, ALPageWrapper } from '../admin-layout/admin-layout'
import { NavigationBar } from '../navigation-bar/navigation-bar'
import { Commands, Dashboard, Integrations, NotFound, Songs, Support } from '../tabs'

import styles from './admin-page.module.scss'

const NotAuth = ({ error }: { error: string | null }) => {
    const { t } = useTranslation()

    return (
        <div className={styles.notAuthorized}>
            <span className={styles.notAuthorizedMessage}>{t('login-page.not-auth')}</span>
            <br />
            <span className={styles.login}>
                {`${t('login-page.need-auth-text-1')} `}
                <a href="/login" className={styles.loginLink}>
                    {`${t('login-page.need-auth-text-2')} `}
                    <HyperinkIcon height="0.8rem" width="0.8rem" />
                </a>
            </span>
            <br />
            {error !== null && <span className={styles.notAuthorizedError}>{error}</span>}
        </div>
    )
}

export const AdminPage = () => {
    const dispatch = useAppDispatch()

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
                        {auth.status === 'rejected' && <NotAuth error={auth.error} />}
                    </PageContentExpanded>
                </PageContent>
            </Page>
        )

    if (auth.auth !== null)
        return (
            <ALPageWrapper>
                <NavigationBar authData={auth.auth} />
                <ALPage>
                    <Routes>
                        <Route path="/" element={<Dashboard streamer={auth.auth} />} />
                        <Route path="/commands" element={<Commands />} />
                        <Route path="/integrations" element={<Integrations streamer={auth.auth} />} />
                        <Route path="/songs/*" element={<Songs streamer={auth.auth} />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </ALPage>
            </ALPageWrapper>
        )

    return <></>
}
