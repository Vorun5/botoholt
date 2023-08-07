import { AboutBotoholt, Footer, Header, StreamerList } from 'widgets'
import { TwitchIcon } from 'shared/assets/icons/social'
import { useDocumentTitle } from 'shared/lib/hooks'
import { Page, PageContent } from 'shared/ui'
import { useTranslation } from 'react-i18next'

import { NewUpdate } from '../new-update/new-update'

import styles from './home-page.module.scss'

export const HomePage = () => {
    const { t } = useTranslation()
    useDocumentTitle('Botoholt')

    return (
        <>
            <Page>
                <Header />
                <NewUpdate />
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
