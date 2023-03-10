import styles from './Header.module.css'
import Bloc from 'components/Bloc/Bloc'
import StreamerAvatar from 'components/StreamerAvatar/StreamerAvatar'
import ToggleLanguage from 'components/ToggleLanguage/ToggleLanguage'
import ToggleTheme from 'components/ToggleTheme/ToggleTheme'
import useStreamers from 'hooks/useStreamers'
import { Link } from 'react-router-dom'

const STREAMERS_SHOWING_COUNT = 4

const HeaderDesktop = () => {
    const { streamers } = useStreamers()

    const count = streamers.length - STREAMERS_SHOWING_COUNT
    const viewSteamers =
        streamers.length > STREAMERS_SHOWING_COUNT
            ? streamers.slice(0, STREAMERS_SHOWING_COUNT)
            : streamers

    return (
        <div className={styles.container}>
            <Link className={styles.logo} to='/'>
                <img src='/images/Logo.svg' alt='logo' />
            </Link>
            <div className={styles.streamers}>
                {viewSteamers.map((streamer) => (
                    <div className={styles.streamers__streamer} key={streamer.login}>
                        <Link to={'/' + streamer.login}>
                            <StreamerAvatar streamer={streamer} />
                        </Link>
                    </div>
                ))}
                {count > 0 && (
                    <Link to='/' className={styles.streamers__count}>
                        +{count}
                    </Link>
                )}
            </div>
            <div className={styles.settings}>
                <ToggleLanguage />
                <Bloc width='60px' />
                <ToggleTheme />
            </div>
        </div>
    )
}

export default HeaderDesktop
