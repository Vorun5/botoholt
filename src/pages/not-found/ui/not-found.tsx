import { Footer } from 'widgets/footer'
import { PageContent, PageContentExpanded } from 'shared/ui'
import styles from './not-found.module.scss'

export const NotFound = () => {
    return (
        <>
            <PageContent>
                <PageContentExpanded>
                    <span className={styles.message}>404</span>
                </PageContentExpanded>
            </PageContent>
            <Footer />
        </>
    )
}
