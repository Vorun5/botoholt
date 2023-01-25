import styles from "./Buttons.module.css";


// TODO: переделать на children
interface ButtonProps {
    isActive: boolean;
    text: string;
    onClick?: () => void;
}

const Button = ({text, isActive, onClick = () => {}}: ButtonProps) =>
    <div onClick={onClick} className={`${styles.button} ${isActive ? styles.button_active : ""}`}>
        <span>{text}</span>
    </div>;

export default Button;
