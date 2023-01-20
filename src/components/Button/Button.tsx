import styles from "./Button.module.css";

interface ButtonProps {
    text: string;
    onClick: () => void;
    isActive: boolean;
}

const Button = ({text, onClick, isActive}: ButtonProps) =>
    <div
        className={`${styles.button} ${isActive ? styles.button_active : ""}`}
        onClick={onClick}
    >
        <span>{text}</span>
    </div>;

export default Button;
