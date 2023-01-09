import {Streamer} from "../../models/Streamer";
import styles from "./StreamerProfile.module.css";
import StreamerAvatar from "../StreamerAvatar/StreamerAvatar";

const StreamerProfile= ({streamer} : {streamer: Streamer}) => {
    return <div className={styles.container}>
        <p>{streamer.login}</p>
        <StreamerAvatar streamer={streamer}/>
    </div>
}

export {StreamerProfile}
