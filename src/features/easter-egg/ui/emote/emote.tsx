import styles from './emote.module.scss'

interface EmoteProps {
    src: string
    alt: string
}

export const Emote = ({ src, alt }: EmoteProps) => {
    return (
        <img
            className={styles.emote}
            src={src}
            alt={alt}
        />
    )
}
