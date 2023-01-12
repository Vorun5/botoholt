import {Streamer} from "../../models/Streamer";
import styles from "./StreamerCard.module.css";
import StreamerAvatar from "../StreamerAvatar/StreamerAvatar";
import {HandySvg} from "handy-svg";

type Degree = 'thousands' | 'none';

const getNumberFollowersAndDegree = (followers: number): [string, Degree] => {
    let result = followers.toString();
    let degree: Degree = 'none';
    const thousands = Math.floor(followers / 1000);
    if (thousands >= 1) {
        result = thousands.toString();
        degree = 'thousands';
    }

    return [result, degree];
}

const StreamerCard = ({streamer, title}: { streamer: Streamer, title: string | null }) => {
    const [followers, degree] = getNumberFollowersAndDegree(streamer.view_count);

    return (
        <div className={styles.container}>

            <div className={styles.content}>

                <div className={styles.streamer}>
                    <div>
                        {title != null ? <div className={styles.title}>Информация о канале</div> : <></>}

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

                                <p>{followers}{degree === "thousands" ? " тыс. " : ""}
                                    <span className={styles.followers}> фолловеров</span>
                                </p>
                            </div>

                        </div>

                        <div
                            className={styles.description}
                        >{streamer.stream_info == null
                            ? streamer.description
                            : streamer.stream_info?.title}
                        </div>
                    </div>

                    <div className={styles.stream_status}>
                        <div className={styles.divider}/>

                        <div className={styles.status}>
                            <div className={styles.status_indicator + " " +
                                (streamer.stream_info == null
                                    ? styles.status_indicator__offline
                                    : styles.status_indicator__online)}
                            />
                            <span
                                className={styles.status_text}>
                            {streamer.stream_info == null
                                ? "Стример оффлайн"
                                : "Сейчас онлайн!"}
                        </span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export {StreamerCard}
