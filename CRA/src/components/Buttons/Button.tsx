import { ButtonProps } from './Button.props'
import styles from './Buttons.module.css'
import clsx from 'clsx'

const Button = ({ text, isActive, onClick = () => {} }: ButtonProps) => (
    <div onClick={onClick} className={clsx(styles.button, isActive && styles.button_active)}>
        <span>{text}</span>
    </div>
)

export default Button
