import styles from "./HomePage.module.css";
import {useEffect, useState} from "react";
import {StreamerCard} from "../../components/StreamerCard/StreamerCard";
import {Streamer} from "../../models/Streamer";
import ApiService from "../../services/ApiService";
import {Link} from "react-router-dom";
import CreateWith from "../../components/CreateWith/CreateWith";
import {useTranslation} from "react-i18next";
import Loading from "../../components/Loading/Loading";


const HomePage = () => {
    const {t} = useTranslation();
    const [streamers, setStreamers] = useState<Array<Streamer>>([]);

    useEffect(() => getSteamers(), []);

    const getSteamers = () => {
        ApiService.getAllStreamers()
            .then((response) => setStreamers(response.data))
            .catch((e) => console.log(e));
    };

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
