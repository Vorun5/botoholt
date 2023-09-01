import { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './tabs.module.scss';

export const Tabs = ({ children, line = false }: { children: ReactNode; line?: boolean }) => {
    return <div className={clsx(styles.tabs, line && styles.tabsLine)}>{children}</div>
}

export const Tab = ({
    isFocus = false,
    onClick,
    children,
}: {
    isFocus?: boolean
    onClick: () => void
    children: ReactNode
}) => {
    return (
        <button type="button" className={clsx(styles.tab, isFocus && styles.tabFocus)} onClick={onClick}>
            {children}
        </button>
    )
}
