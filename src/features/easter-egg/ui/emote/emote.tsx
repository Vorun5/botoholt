import styles from './emote.module.scss'

// change this if you transfer emotes to another place
const BASE_EMOTE_PATH = '/src/features/easter-egg/ui/emotes/'

export const Emote = ({ emoteName }: { emoteName: string }) => {
    return (
        <img
            className={styles.emote}
            src={`${BASE_EMOTE_PATH}${emoteName}`}
            alt={` ${emoteName.replaceAll('.gif', '').replace('.png', '')} `}
        />
    )
}
