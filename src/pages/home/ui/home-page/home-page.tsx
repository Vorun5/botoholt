import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Footer } from 'widgets/footer';
import { StreamerList } from 'widgets/streamer-list';
import { PageContent } from 'shared/ui';
import { About } from '../about/about';
import styles from './home-page.module.scss';

export const HomePage = () => {
    const { t } = useTranslation()

    useEffect(() => {
        window.document.title = "Botoholt"
    }, [])

    return (
        <>
            <PageContent>
                <About />
                <h1 className={styles.streamersTitle}>{t('top-streamers')}</h1>
                <StreamerList />
            </PageContent>
            <Footer />
        </>
    )
}
