import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AboutBotoholt, Footer, Header, StreamerList } from 'widgets'
import { TwitchIcon } from 'shared/assets/icons/social'
import { Page, PageContent } from 'shared/ui'
import styles from './home-page.module.scss'

export const HomePage = () => {
    const { t } = useTranslation()

    useEffect(() => {
        window.document.title = 'Botoholt'
    }, [])

    return (
        <>
            <Page>
                <Header />
                <PageContent>
                    <span className={styles.title}>{t('about-botoholt')}</span>
                    <AboutBotoholt />
                    <span className={styles.title}>
                        <TwitchIcon
                            style={{
                                position: 'relative',
                                top: '6px',
                            }}
                            width="32px"
                            height="32px"
                            color="#673AB7"
                        />{' '}
                        {t('top-streamers')}
                    </span>
                    <StreamerList />
                </PageContent>
                <Footer />
            </Page>
        </>
    )
}
