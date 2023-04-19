import { Footer, Header } from 'widgets'
import { Page, PageContent, PageContentExpanded } from 'shared/ui'
import styles from './not-found.module.scss'

export const NotFound = () => {
    return (
        <Page>
            <Header />
            <PageContent>
                <PageContentExpanded>
                    <span className={styles.message}>404</span>
                </PageContentExpanded>
            </PageContent>
            <Footer />
        </Page>
    )
}
