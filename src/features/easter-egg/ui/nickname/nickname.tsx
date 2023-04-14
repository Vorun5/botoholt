import styles from './nickname.module.scss'

export const Nickname = ({ nickname }: { nickname: string }) => (
    <a
        className={styles.nickname}
        target="_blank"
        href={`https://www.twitch.tv/${nickname.toLowerCase()}`}
        rel="noreferrer"
    >
        {`@${nickname}`}
    </a>
)
