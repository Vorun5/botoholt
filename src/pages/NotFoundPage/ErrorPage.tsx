import styles from "./ErrorPage.module.css";

interface ErrorPageProps {
    text: string;
}

const ErrorPage = ({text}: ErrorPageProps) => {

    return <div className={styles.container}>{text}</div>;
}

export default ErrorPage;
