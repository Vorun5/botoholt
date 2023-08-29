import { useStreamerQuery } from 'entities/streamer'
import { Card, CardDescription, CardExpanded, CardTitle, ErrorMessage } from 'shared/ui'
import { useTranslation } from 'react-i18next'

import styles from '../dashboard.module.scss'

export const StreamInfo = ({ login }: { login: string }) => {
    const { t } = useTranslation()
    const { data: streamer, isSuccess, isLoading, fetchStatus, isError } = useStreamerQuery(login)

    return (
        <Card
            style="blue"
            className={styles.streamInfoCard}
            skeleton={isLoading}
            s={{
                minHeight: '225px',
            }}
        >
            {isError && <ErrorMessage>{`Error status: ${fetchStatus}`}</ErrorMessage>}
            {isSuccess && (
                <>
                    <CardDescription style="blue">{t('admin-page.dashboard.stream.category')}</CardDescription>
                    <CardExpanded>
                        <CardTitle className={styles.streamInfoCardTitle} style="blue">
                            {streamer.channelInfo?.category}
                        </CardTitle>
                    </CardExpanded>
                    <CardDescription>{t('admin-page.dashboard.stream.title')}</CardDescription>
                    <span className={styles.streamInfoCardStreamTitle}>{streamer.channelInfo.title}</span>
                </>
            )}
        </Card>
    )
}
