import styles from "../EasterEgg.module.css";

interface NicknameProps {
    nickname: string;
}

const Nickname = ({nickname}: NicknameProps) =>
    <a className={styles.nickname} target="_blank"
       href={`https://www.twitch.tv/${nickname.toLowerCase()}`} rel="noreferrer">{`@${nickname}`}
    </a>

export default Nickname;
