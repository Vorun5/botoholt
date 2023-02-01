import styles from "./EmptyListMessage.module.css";

interface EmptyListMessageProps {
    emote?: string;
    mainText: string;
    text: string;
}

const EmptyListMessage = ({emote = "/emotes/FeelsOkayMan.png", mainText, text}: EmptyListMessageProps) =>
    <div className={styles.container}>
        <img className={styles.emote} src={emote} alt={"emote"}/>
        <span className={styles.text}>
        <span className={styles.text__main}>{mainText}</span>
            {text}
        </span>
    </div>;

export default EmptyListMessage;
