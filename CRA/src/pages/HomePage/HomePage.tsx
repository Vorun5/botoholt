import styles from './HomePage.module.css'
import CreateWith from 'components/CreateWith/CreateWith'
import Loading from 'components/Loading/Loading'
import { StreamerCard } from 'components/StreamerCard/StreamerCard'
import useStreamers from 'hooks/useStreamers'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const HomePage = () => {
    const { t } = useTranslation()
    const { streamers } = useStreamers()

    return (
        <>
            <div className={styles.container}>
                <div className={styles.about}>
                    <h1 className={styles.about__title}>{t('about-botoholt')}</h1>
                    <p className={styles.about__text}>
                        <span className={styles.indent} />
                        {t('about-botoholt-text-1')}
                        <br /> <span className={styles.indent} /> {t('about-botoholt-text-2')}
                        <span className={styles.contact}>Urbinholt#0640</span>
                        {t('about-botoholt-text-3')}
                    </p>
                </div>
                {streamers.length === 0 ? (
                    <Loading />
                ) : (
                    <div className={styles.top}>
                        <div className={styles.top_title}>{t('top-streamers')}</div>
                        {streamers.length === 1 ? (
                            <Link
                                key={streamers[0].login}
                                to={`/${streamers[0].login}`}
                                className={styles.wrapper_item}
                            >
                                <StreamerCard title={null} streamer={streamers[0]} />
                            </Link>
                        ) : (
                            <div className={styles.wrapper}>
                                {streamers.map((streamer) => (
                                    <Link
                                        key={streamer.login}
                                        to={`/${streamer.login}`}
                                        className={styles.wrapper_item}
                                    >
                                        <StreamerCard title={null} streamer={streamer} />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <CreateWith />
        </>
    )
}

export default HomePage
