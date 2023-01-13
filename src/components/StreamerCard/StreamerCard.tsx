import {Streamer} from "../../models/Streamer";
import styles from "./StreamerCard.module.css";
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

const StreamerCard = ({streamer, title}: { streamer: Streamer, title: string | null }) => {
    const {t} = useTranslation();
    const [followers, degree] = getNumberFollowersAndDegree(streamer.view_count);
    const isOnline = streamer.stream_info != null;

    return (
        <div className={styles.container}>

            <div className={styles.content}>

                <div className={styles.streamer}>
                    <div>
                        {title != null ? <div className={styles.title}>{title}</div> : <></>}

                        <div className={styles.info}>
                            <div className={styles.info_avatar}>
                                <StreamerAvatar streamer={streamer}/>
                            </div>

                            <div className={styles.main_info}>
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

                        <div
                            className={styles.description}
                        >{isOnline == null
                            ? streamer.stream_info?.title
                            : streamer.description}
                        </div>
                    </div>

                    <div className={styles.stream_status}>
                        <div className={styles.divider}/>

                        <div className={styles.status}>
                            <div className={styles.status_indicator + " " +
                                (isOnline ? styles.status_indicator__online : styles.status_indicator__offline)}
                            />
                            <span className={styles.status_text}>
                            {isOnline == null
                                ? t("streamer-card.online")
                                : t("streamer-card.offline")}
                            </span>
                        </div>
                        {isOnline
                            ? <div className={styles.category}>{streamer.stream_info?.game_name}</div>
                            : <></>}
                    </div>

                </div>

            </div>
        </div>
    )
}

export {StreamerCard}
