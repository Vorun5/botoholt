import { ReactNode } from 'react';

import styles from './error-message.module.scss';

export const ErrorMessage = ({ title, children }: { title?: string; children: ReactNode }) => {
    return (
        <div className={styles.error}>
            <h3 className={styles.errorTitle}>{title ?? 'Error!'}</h3>
            <span className={styles.errorMessage}>{children}</span>
        </div>
    )
}
