import styles from "./Header.module.css";
import ToggleLanguage from "../ToggleLanguage/ToggleLanguage";
import StreamerAvatar from "../StreamerAvatar/StreamerAvatar";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import Bloc from "../Bloc/Bloc";
import {Link} from "react-router-dom";
import useStreamers from "../../hooks/useStreamers";

const STREAMERS_SHOWING_COUNT = 4;

const HeaderDesktop = () => {
    const {streamers} = useStreamers();

    const count = streamers.length - STREAMERS_SHOWING_COUNT;
    const viewSteamers = streamers.length > STREAMERS_SHOWING_COUNT ? streamers.slice(0, STREAMERS_SHOWING_COUNT) : streamers;

    return (
        <div className={styles.container}>
            <Link className={styles.logo} to="/">
                <img src="../images/Logo.svg" alt="logo"/>
            </Link>
            <div className={styles.streamers}>
                {viewSteamers.map((streamer) => <div className={styles.streamers__streamer} key={streamer.login}>
                    <Link to={"/" + streamer.login}><StreamerAvatar streamer={streamer}/></Link>
                </div>)}
                {(count > 0) ? <Link to="/" className={styles.streamers__count}>+{count}</Link> : <></>}
            </div>
            <div className={styles.settings}>
                <ToggleLanguage/>
                <Bloc width="60px"/>
                <ToggleTheme/>
            </div>
        </div>
    );
}

export default HeaderDesktop;
