import styles from "./StreamerNotFoundPage.module.css";

const StreamerNotFoundPage = ({login}: { login: string }) =>
    <div className={styles.container}>{login} не полдючён к Botoholt</div>

export default StreamerNotFoundPage;
