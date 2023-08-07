import { useDocumentTitle } from 'shared/lib/hooks'
import { AdminAuth } from 'shared/types'
import { useTranslation } from 'react-i18next'

import { ALPageContent, ALPageHeader } from '../../admin-layout/admin-layout'
import { Emotes } from './ui/emotes'
import { LastOrderSong } from './ui/last-order-song'
import { Services } from './ui/services'
import { Statistic } from './ui/statistic'
import { StreamInfo } from './ui/stream-info'

import styles from './dashboard.module.scss'

interface DashboardProps {
    streamer: AdminAuth
}

export const Dashboard = ({ streamer }: DashboardProps) => {
    const { t } = useTranslation()
    useDocumentTitle(t('admin-page.nav.dashboard'))

    return (
        <>
            <ALPageHeader>
                <span>{t('welcome')},</span> {streamer.name}
            </ALPageHeader>
            <ALPageContent className={styles.pageContent}>
                <Services services={streamer.services} />
                <Emotes />
                <div className={styles.streamInfo}>
                    <StreamInfo login={streamer.login} />
                    <Statistic />
                </div>
                {streamer.services.da_api && <LastOrderSong login={streamer.login} />}
            </ALPageContent>
        </>
    )
}
