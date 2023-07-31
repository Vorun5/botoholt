import clsx from 'clsx'

import styles from './burger.module.scss'

interface BurgerProps {
    onClick: () => void
    isOpen: boolean
}

export const Burger = ({ onClick, isOpen }: BurgerProps) => {
    return (
        <button type="button" className={clsx(styles.burger, isOpen && styles.burgerOpen)} onClick={() => onClick()}>
            <div />
            <div />
            <div />
        </button>
    )
}
