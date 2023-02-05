import styles from '../StreamerPage.module.css'
import LinkButton from 'components/Buttons/LinkButton'
import Bloc from 'components/Bloc/Bloc'
import Button from 'components/Buttons/Button'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { NavigationProps } from './Navigation.props'

const Navigation = ({ streamer, period, setSearchParams }: NavigationProps) => {
    const { t } = useTranslation()
    const location = useLocation()

    const checkLocation = (pathname: string, str: string): boolean =>
        pathname
            .toLowerCase()
            .includes(`/${streamer.login.toLowerCase()}${str}`)

    const changeLocation = (str: string): string =>
        `/${streamer.login.toLowerCase()}${str}`

    const isTopDJsTab = checkLocation(location.pathname, '/top/djs')
    const isTopSongsTab = checkLocation(location.pathname, '/top/songs')
    return (
        <div className={styles.content__navigation}>
            <div className={styles.navigation__tabs}>
                <div>
                    <LinkButton
                        url={changeLocation('')}
                        isActive={
                            location.pathname.toLowerCase() ===
                                '/' + streamer.login.toLowerCase() ||
                            location.pathname.toLowerCase() ===
                                '/' + streamer.login.toLowerCase() + '/'
                        }
                        text={t('streamer-page.tabs.queue')}
                    />
                </div>
                <div>
                    <LinkButton
                        url={changeLocation('/h')}
                        isActive={checkLocation(location.pathname, '/h')}
                        text={t('streamer-page.tabs.history')}
                    />
                </div>
                <div>
                    <LinkButton
                        url={changeLocation(`/top/djs`)}
                        isActive={isTopDJsTab}
                        text={t('streamer-page.tabs.top-djs')}
                    />
                </div>
                <div>
                    <LinkButton
                        url={changeLocation(`/top/songs`)}
                        isActive={isTopSongsTab}
                        text={t('streamer-page.tabs.top-songs')}
                    />
                </div>
            </div>
            {isTopSongsTab ||
                (isTopDJsTab && (
                    <div className={styles.navigation__filters}>
                        <span className={styles.filters__title}>
                            {t('streamer-page.filter')}
                        </span>
                        <Bloc width="20px" />
                        <div className={styles.filters__buttons}>
                            <div>
                                <Button
                                    isActive={period === 'week'}
                                    text={t('streamer-page.tabs.filters.week')}
                                    onClick={() =>
                                        setSearchParams({ period: 'week' })
                                    }
                                />
                            </div>
                            <div>
                                <Button
                                    isActive={period === 'month'}
                                    text={t('streamer-page.tabs.filters.month')}
                                    onClick={() =>
                                        setSearchParams({ period: 'month' })
                                    }
                                />
                            </div>
                            <div>
                                <Button
                                    isActive={period === 'alltime'}
                                    text={t(
                                        'streamer-page.tabs.filters.all-time',
                                    )}
                                    onClick={() =>
                                        setSearchParams({ period: 'alltime' })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default Navigation
