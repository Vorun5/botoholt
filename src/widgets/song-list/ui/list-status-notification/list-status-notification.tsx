import styles from './list-status-notification.module.scss'

interface ListStatusNotificationProps {
    title: string
    text: string
    emote: string
    altEmote: string
}

export const ListStatusNotification = ({ title, text, emote, altEmote }: ListStatusNotificationProps) => {
    return (
        <div className={styles.state}>
            <img className={styles.stateEmote} src={emote} alt={altEmote} />
            <div>
                <h2 className={styles.stateTitle}>{title}</h2>
                <span className={styles.stateText}> {text}</span>
            </div>
        </div>
    )
}
