import styles from "./EmptyListMessage.module.css";
import { EmptyListMessageProps } from "./EmptyListMessage.props";

const EmptyListMessage = ({
  emote = "/emotes/FeelsOkayMan.png",
  mainText,
  text,
}: EmptyListMessageProps) => (
  <div className={styles.container}>
    <img className={styles.emote} src={emote} alt={"emote"} />
    <span className={styles.text}>
      <span className={styles.text__main}>{mainText}</span>
      {text}
    </span>
  </div>
);

export default EmptyListMessage;
