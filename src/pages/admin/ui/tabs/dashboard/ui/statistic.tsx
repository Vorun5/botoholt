import { Card, CardDescription, CardTitle } from 'shared/ui'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { Soon } from './soon'

import styles from '../dashboard.module.scss'

export const Statistic = () => {
    const { t } = useTranslation()

    return (
        <Soon>
            <Card style="orange" className={clsx(styles.streamInfoCard, styles.soonCard)}>
                <CardDescription style="orange">15.03.2023 - 22.03.2023</CardDescription>
                <div className={styles.streamInfoCardTitle}>
                    <CardTitle style="orange">{t('admin-page.dashboard.statistic.title')}</CardTitle>
                </div>
                <CardDescription>{t('admin-page.dashboard.statistic.number-of-messages')}</CardDescription>
                <CardTitle>32 414</CardTitle>
                <CardDescription>{t('admin-page.dashboard.statistic.number-of-ordered-songs')}</CardDescription>
                <CardTitle>1 231</CardTitle>
            </Card>
        </Soon>
    )
}
