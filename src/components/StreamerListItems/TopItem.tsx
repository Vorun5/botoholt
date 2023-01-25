import styles from "./StreamerListItems.module.css";
import TopListItem from "../../models/TopListItem";

interface TopItemProps {
    topItem: TopListItem;
}

const TopItem = ({topItem}: TopItemProps) =>
    <div className={styles.container}>
        <span className={styles.number}>{topItem.number}</span>
        <div className={styles.info}>
            {topItem.link != null
                ? <a href={topItem.link} target="_blank" className={styles.name} rel="noreferrer">{topItem.text}</a>
                : <span className={styles.name}>{topItem.text}</span>
            }
        </div>
        <div className={styles.extra}>{topItem.count}</div>
    </div>


export default TopItem;
