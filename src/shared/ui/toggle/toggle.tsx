import { InputHTMLAttributes } from 'react'

import styles from './toggle.module.scss'

export const Toggle = ({ checked, onChange }: InputHTMLAttributes<HTMLInputElement>) => {
    return <input checked={checked} onChange={onChange} type="checkbox" className={styles.toggle} />
}
