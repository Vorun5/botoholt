import { useAuthDataQeury } from 'entities/admin-auth'
import { HyperinkIcon } from 'shared/assets/icons'
import { Loading, Page, PageContent, PageContentExpanded } from 'shared/ui'
import { useTranslation } from 'react-i18next'
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
    const { data: auth, isLoading, isError, isSuccess, fetchStatus } = useAuthDataQeury()

    if (!isSuccess)
        return (
            <Page>
                <PageContent>
                    <PageContentExpanded>
                        {isLoading && <Loading />}
                        {isError && <NotAuth error={`Error status: ${fetchStatus}`} />}
                    </PageContentExpanded>
                </PageContent>
            </Page>
        )

    if (isSuccess)
        return (
            <ALPageWrapper>
                <NavigationBar authData={auth} />
                <ALPage>
                    <Routes>
                        <Route path="/" element={<Dashboard streamer={auth} />} />
                        <Route path="/commands" element={<Commands />} />
                        <Route path="/integrations" element={<Integrations streamer={auth} />} />
                        <Route path="/songs/*" element={<Songs streamer={auth} />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </ALPage>
            </ALPageWrapper>
        )

    return <></>
}
