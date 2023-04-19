import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Footer, Header, StreamerList } from 'widgets'
import { Page, PageContent } from 'shared/ui'
import { About } from '../about/about'
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
                    <About />
                    <h1 className={styles.streamersTitle}>{t('top-streamers')}</h1>
                    <StreamerList />
                </PageContent>
                <Footer />
            </Page>
        </>
    )
}
