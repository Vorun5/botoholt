import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { loadAuthData } from 'entities/admin-auth/model'
import { HyperinkIcon } from 'shared/assets/icons'
import { RootState, useAppDispatch } from 'shared/lib/store'
import { Loading, Page, PageContent, PageContentExpanded } from 'shared/ui'
import { ALPage, ALPageWrapper } from '../admin-layout/admin-layout'
import { NavigationBar } from '../navigation-bar/navigation-bar'
import { Commands, Dashboard, Integrations, NotFound, SongQueue, Support } from '../tabs'
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

    return (
        <ALPageWrapper>
            <NavigationBar />
            <ALPage>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/commands" element={<Commands />} />
                    <Route path="/integrations" element={<Integrations />} />
                    <Route path="/song-queue" element={<SongQueue />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ALPage>
        </ALPageWrapper>
    )
}
