import styles from './ErrorPage.module.css'

const ErrorPage = ({ text }: { text: string }) => (
    <div className={styles.container}>{text}</div>
)

export default ErrorPage
