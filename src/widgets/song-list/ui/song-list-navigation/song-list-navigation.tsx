import { useRef } from 'react'
import { useElementSize } from 'shared/lib/hooks'
import { Period } from 'shared/types'
import { Button, ButtonText } from 'shared/ui'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'

import styles from './song-list-navigation.module.scss'

export type StreamerPageTab = 'queue' | 'history' | 'top-songs' | 'top-djs'

interface LinkButtonProps {
    url: string
    children: string
    isActive?: boolean
}
const LinkButton = ({ children, url, isActive: active }: LinkButtonProps) => {
    return (
        <Link to={url}>
            <Button style={active ? 'fill-blue' : 'default'} padding="small" className={styles.navBth}>
                <ButtonText>{children}</ButtonText>
            </Button>
        </Link>
    )
}

interface SongListNavigationProps {
    login: string
    className?: string
    baseUrlForRedirect: string
    tab: StreamerPageTab
    period: Period
}

export const SongListNavigation = ({ className, login, baseUrlForRedirect, tab, period }: SongListNavigationProps) => {
    const { t } = useTranslation()
    const [_, setSearchParams] = useSearchParams()
    const ref = useRef<HTMLDivElement>(null)
    const { width } = useElementSize(ref)

    const redirect = (str: string): string => `${baseUrlForRedirect}${str}`

    return (
        <div ref={ref} className={clsx(styles.nav, width < 1100 && styles.navCompact, className)}>
            <div>
                <LinkButton isActive={tab === 'queue'} url={redirect('')}>
                    {t('streamer-page.tabs.queue')}
                </LinkButton>
                <LinkButton isActive={tab === 'history'} url={redirect('/h')}>
                    {t('streamer-page.tabs.history')}
                </LinkButton>
                <LinkButton isActive={tab === 'top-djs'} url={redirect('/top/djs')}>
                    {t('streamer-page.tabs.top-djs')}
                </LinkButton>
                <LinkButton isActive={tab === 'top-songs'} url={redirect('/top/songs')}>
                    {t('streamer-page.tabs.top-songs')}
                </LinkButton>
            </div>
            {((period && tab === 'top-djs') || tab === 'top-songs') && (
                <div>
                    <span className={styles.navTitle}>{t('streamer-page.filter')}</span>
                    <Button
                        className={styles.navBth}
                        style={period === 'week' ? 'fill-blue' : 'default'}
                        onClick={() => setSearchParams({ period: 'week' })}
                    >
                        <ButtonText>{t('streamer-page.tabs.filters.week')}</ButtonText>
                    </Button>
                    <Button
                        className={styles.navBth}
                        style={period === 'month' ? 'fill-blue' : 'default'}
                        onClick={() => setSearchParams({ period: 'month' })}
                    >
                        <ButtonText>{t('streamer-page.tabs.filters.month')}</ButtonText>
                    </Button>
                    <Button
                        className={styles.navBth}
                        style={period === 'alltime' ? 'fill-blue' : 'default'}
                        onClick={() => setSearchParams({ period: 'alltime' })}
                    >
                        <ButtonText>{t('streamer-page.tabs.filters.all-time')}</ButtonText>
                    </Button>
                </div>
            )}
        </div>
    )
}
