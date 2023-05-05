import styles from './top-emotes.module.scss'

export interface Emote {
    name: string
    url: string
    source: 'BetterTTV' | '7TV' | 'FrankerFaceZ'
    number: number
    amount: number
}

interface TopEmotesProps {
    emotes: Emote[]
}

export const TopEmotes = ({ emotes }: TopEmotesProps) => {
    return (
        <div className={styles.emotes}>
            {emotes.map((emote, index) => (
                <div key={index} className={styles.emote}>
                    <div className={styles.emoteInfo}>
                        <img src={emote.url} alt={emote.name} width={50} height={50} />
                        <span className={styles.emoteNumber}>{emote.number}</span>
                        <span>
                            <span className={styles.emoteName}>{emote.name}</span>
                            <br />
                            <span className={styles.emoteSource}>{emote.source}</span>
                        </span>
                    </div>
                    <span className={styles.emoteAmount}>{emote.amount}</span>
                </div>
            ))}
        </div>
    )
}
