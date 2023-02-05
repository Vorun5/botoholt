import styles from './Buttons.module.css'
import { ButtonProps } from './Button.props'

const Button = ({ text, isActive, onClick = () => {} }: ButtonProps) => (
    <div
        onClick={onClick}
        className={`${styles.button} ${isActive && styles.button_active}`}
    >
        <span>{text}</span>
    </div>
)

export default Button
