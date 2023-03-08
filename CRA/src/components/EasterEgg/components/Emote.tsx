import styles from '../EasterEgg.module.css'
import { EmoteProps } from './Emote.props'

const Emote = ({ path, alt }: EmoteProps) => <img className={styles.emote} src={path} alt={alt} />

export default Emote
