import styles from "./StreamerListItems.module.css";
import TopListItem from "models/TopListItem";

const TopItem = ({ topItem }: { topItem: TopListItem }) => (
  <div className={styles.container}>
    <span className={styles.number}>{topItem.number}</span>
    <div className={styles.info}>
      {topItem.link != null ? (
        <a
          className={`${styles.name} ${styles.hoverable}`}
          href={topItem.link}
          target="_blank"
          rel="noreferrer"
        >
          {topItem.text}
        </a>
      ) : (
        <span className={styles.name}>{topItem.text}</span>
      )}
    </div>
    <div className={styles.extra}>{topItem.count}</div>
  </div>
);

export default TopItem;
