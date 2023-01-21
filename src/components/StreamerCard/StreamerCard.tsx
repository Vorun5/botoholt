import styles from "./StreamerCard.module.css";
import {Streamer} from "../../models/Streamer";
import StreamerAvatar from "../StreamerAvatar/StreamerAvatar";
import {HandySvg} from "handy-svg";
import {useTranslation} from "react-i18next";

type Degree = "thousands" | "none";

const getNumberFollowersAndDegree = (followers: number): [string, Degree] => {
    let result = followers.toString();
    let degree: Degree = 'none';
    const thousands = Math.floor(followers / 1000);
    if (thousands >= 1) {
        result = thousands.toString();
        degree = "thousands";
    }

    return [result, degree];
}

interface StreamerCardProps {
    streamer: Streamer,
    title: string | null;
}

const StreamerCard = ({streamer, title = null}: StreamerCardProps) => {
    const {t} = useTranslation();
    const [followers, degree] = getNumberFollowersAndDegree(streamer.view_count);
    const isOnline = streamer.streamInfo != null;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.streamer}>
                    <div>
                        {title != null  ? <div className={styles.title}>{title}</div> : <></>}
                        <div className={styles.info}>
                            <div className={styles.info__avatar}>
                                <StreamerAvatar streamer={streamer}/>
                            </div>
                            <div className={styles.main__info}>
                                <span className={styles.login}>
                                    {streamer.display_name}
                                    {streamer.broadcaster_type === "partner"
                                        ? <HandySvg
                                            className={styles.approval}
                                            src="../icons/approval.svg"
                                            width="18px"
                                            height="18px"
                                        />
                                        : <></>}
                                </span>
                                <p>{followers}{degree === "thousands" ? t("thousands") : ""}
                                    <span className={styles.followers}> {t("streamer-card.followers")}</span>
                                </p>
                            </div>
                        </div>
                        <div className={styles.description}>
                            {isOnline ? streamer.streamInfo?.title : streamer.description}
                        </div>
                    </div>
                    <div className={styles.stream__status}>
                        <div className={styles.divider}/>

                        <div className={styles.status}>
                            <div
                                className={`${styles.status__indicator} ${isOnline ? styles.status__indicator_online : styles.status__indicator_offline}`}
                            />
                            <span className={styles.status__text}>
                            {isOnline ? t("streamer-card.online") : t("streamer-card.offline")}
                            </span>
                        </div>
                        {isOnline ? <div className={styles.category}>{streamer.streamInfo?.game_name}</div> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export {StreamerCard}
