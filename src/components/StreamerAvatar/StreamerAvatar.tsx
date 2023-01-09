import {Streamer} from "../../models/Streamer";
import styles from "./StreamerAvatar.module.css";

const StreamerAvatar = ({streamer} : {streamer: Streamer}) => {
    const isOnline = streamer.stream_info != null;

    return <div className={styles.container + " " + (isOnline ? styles.online : styles.offline)}>
        <img className={styles.img} src={streamer.profile_image_url} alt={streamer.display_name}/>
    </div>
}

export default StreamerAvatar;
