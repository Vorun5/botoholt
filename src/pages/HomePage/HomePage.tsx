import styles from "./HomePage.module.css";
import {StreamerCard} from "../../components/StreamerCard/StreamerCard";
import {Link} from "react-router-dom";
import CreateWith from "../../components/CreateWith/CreateWith";
import {useTranslation} from "react-i18next";
import Loading from "../../components/Loading/Loading";
import useStreamers from "../../hooks/useStreamers";


const HomePage = () => {
    const {t} = useTranslation();
    const {streamers} = useStreamers();

    return (
        <>
            <div className={styles.container}>
                {streamers.length === 0
                    ? <Loading/>
                    : <div className={styles.top}>
                        <div className={styles.top_title}>{t("top-streamers")}</div>
                        <div className={styles.wrapper}>{streamers.map(
                            (streamer) =>
                                <Link key={streamer.login} to={`/${streamer.login}`} className={styles.wrapper_item}>
                                    <StreamerCard title={null} streamer={streamer}/>
                                </Link>)}
                        </div>
                    </div>
                }
            </div>
            <CreateWith/>
        </>
    );
}

export default HomePage;
