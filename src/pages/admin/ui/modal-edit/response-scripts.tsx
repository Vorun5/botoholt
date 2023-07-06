import styles from './modal-edit.module.scss'

export const ResponseScripts = () => {
    return (
        <div className={styles.responseScripts}>
            <span className={styles.title}>Сценарии ответов</span>
            <span className={styles.description}>
                Вариация ответов будут активироваться в случайном порядке
            </span>
        </div>
    )
}
