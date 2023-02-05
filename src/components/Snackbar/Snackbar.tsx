import styles from './Snackbar.module.css'
import { SnackbarProps } from './Snackbar.props'

const Snackbar = ({ title, isOpen, close, children }: SnackbarProps) => {
    return (
        <div
            className={`${styles.container} ${
                isOpen ? styles.open : styles.close
            }`}
        >
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <span className={styles.header__title}>{title}</span>
                    <button
                        className={styles.header__close}
                        onClick={() => close()}
                    />
                </div>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    )
}

export default Snackbar
