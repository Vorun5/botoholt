import clsx from 'clsx'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { useElementSize } from 'shared/lib/hooks'
import { Period } from 'shared/types'
import { LinkButton } from '../link-button'
import { TabButton } from '../tab-button/tab-button'
import styles from './navigation.module.scss'

interface NavigationProps {
    period?: Period
    login: string
    tab: 'queue' | 'history' | 'top-songs' | 'top-djs'
    className?: string
}

export const Navigation = ({ period, tab, className, login }: NavigationProps) => {
    const { t } = useTranslation()
    const [_, setSearchParams] = useSearchParams()
    const ref = useRef<HTMLDivElement>(null)
    const { width } = useElementSize(ref)

    const redirect = (str: string): string => `/${login.toLowerCase()}${str}`

    return (
        <div ref={ref} className={clsx(styles.nav, width < 970 && styles.navCompact, className)}>
            <div className={styles.navTabs}>
                <LinkButton active={tab === 'queue'} url={redirect('')}>
                    {t('streamer-page.tabs.queue')}
                </LinkButton>
                <LinkButton active={tab === 'history'} url={redirect('/h')}>
                    {t('streamer-page.tabs.history')}
                </LinkButton>
                <LinkButton active={tab === 'top-djs'} url={redirect('/top/djs')}>
                    {t('streamer-page.tabs.top-djs')}
                </LinkButton>
                <LinkButton active={tab === 'top-songs'} url={redirect('/top/songs')}>
                    {t('streamer-page.tabs.top-songs')}
                </LinkButton>
            </div>
            {((period && tab === 'top-djs') || tab === 'top-songs') && (
                <div className={styles.navPeriods}>
                    <span className={styles.navTitle}>{t('streamer-page.filter')}</span>
                    <TabButton active={period === 'week'} onClick={() => setSearchParams({ period: 'week' })}>
                        {t('streamer-page.tabs.filters.week')}
                    </TabButton>
                    <TabButton active={period === 'month'} onClick={() => setSearchParams({ period: 'month' })}>
                        {t('streamer-page.tabs.filters.month')}
                    </TabButton>
                    <TabButton active={period === 'alltime'} onClick={() => setSearchParams({ period: 'alltime' })}>
                        {t('streamer-page.tabs.filters.all-time')}
                    </TabButton>
                </div>
            )}
        </div>
    )
}
