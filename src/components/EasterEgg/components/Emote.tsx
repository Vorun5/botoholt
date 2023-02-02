import styles from "../EasterEgg.module.css";

interface EmoteProps {
    path: string;
}

const Emote = ({path}: EmoteProps) =>
    <img className={styles.emote} src={path} alt="emote"/>


export default Emote;
