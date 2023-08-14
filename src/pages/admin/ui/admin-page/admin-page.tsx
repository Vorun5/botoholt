import { useAuthDataQeury, useBotLangMutation } from 'entities/admin-auth'
import { HyperinkIcon } from 'shared/assets/icons'
import { ALL_ADMIN_LANG } from 'shared/types'
import { Button, ButtonText, ErrorMessage, Loading, Page, PageContent, PageContentExpanded } from 'shared/ui'
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
    const { t } = useTranslation()
    const { data: auth, isLoading, isError, isSuccess, fetchStatus } = useAuthDataQeury()
    const {
        mutate: changeBotLang,
        isLoading: isBotLangChangeLoading,
        isError: isBotLangeChangeError,
    } = useBotLangMutation()

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

    if (isSuccess) {
        if (!auth.lang) {
            return (
                <Page>
                    <PageContent>
                        <PageContentExpanded>
                            <div className={styles.lang}>
                                {isBotLangChangeLoading ? (
                                    <Loading />
                                ) : (
                                    <>
                                        <span className={styles.langTitle}>Select bot lang</span>
                                        <span className={styles.langDescription}>
                                            {t('admin-page.lang.description')}
                                        </span>
                                        <div className={styles.langList}></div>
                                        {ALL_ADMIN_LANG.map((lang) => (
                                            <Button
                                                key={lang.code}
                                                style="blue"
                                                width="100%"
                                                className={styles.langListItem}
                                                onClick={() => {
                                                    changeBotLang(lang.code)
                                                }}
                                            >
                                                <ButtonText>{lang.name}</ButtonText>
                                            </Button>
                                        ))}
                                        {isBotLangeChangeError && <ErrorMessage>{t('try-again')}</ErrorMessage>}
                                    </>
                                )}
                            </div>
                        </PageContentExpanded>
                    </PageContent>
                </Page>
            )
        } else {
            return (
                <ALPageWrapper>
                    <NavigationBar authData={auth} />
                    <ALPage>
                        <Routes>
                            <Route path="/" element={<Dashboard streamer={auth} />} />
                            <Route path="/commands" element={<Commands services={auth.services} />} />
                            <Route path="/integrations" element={<Integrations authData={auth} />} />
                            {auth.services.da_api && <Route path="/songs/*" element={<Songs streamer={auth} />} />}
                            <Route path="/support" element={<Support />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </ALPage>
                </ALPageWrapper>
            )
        }
    }

    return <></>
}
