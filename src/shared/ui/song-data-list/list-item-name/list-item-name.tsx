import clsx from 'clsx'
import styles from './list-item-name.module.scss'

interface ListItemNameProps {
    children: string
    link?: string
}

export const ListItemName = ({ children, link }: ListItemNameProps) => {
    return link ? (
        <a className={clsx(styles.itemName, styles.itemLink)} href={link}>
            {children}
        </a>
    ) : (
        <span className={styles.itemName}>{children}</span>
    )
}
