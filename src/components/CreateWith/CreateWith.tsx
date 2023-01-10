import styles from "./CreateWith.module.css";

const CreateWith = () => {
    return <div className={styles.container}>
        <p className={styles.creators}>
            Сделано с любовь от <a href="https://www.twitch.tv/vorun5">@Vorun5</a>
            <br/>
            <a href="https://www.twitch.tv/urbinholt">@Urbinholt</a> и <a
            href="https://www.twitch.tv/montag_r">@montag_r</a>
        </p>
        <a href="https://fantalks.io/r/botoholt" className={styles.support}>Поддержать</a>
    </div>
}

export default CreateWith;
