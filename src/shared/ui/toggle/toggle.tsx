import styles from './toggle.module.scss'

interface ToggleProps {
    checked?: boolean
    onChange?: () => void
}

export const Toggle = ({ checked, onChange }: ToggleProps) => {
    return <input checked={checked} onChange={onChange} type="checkbox" className={styles.toggle} />
}
