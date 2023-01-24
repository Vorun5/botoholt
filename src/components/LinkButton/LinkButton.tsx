import styles from "./LinkButton.module.css";
import {Link} from "react-router-dom";

interface LinkButtonProps {
    text: string;
    url: string;
    isActive: boolean;
}

const LinkButton = ({text, url, isActive}: LinkButtonProps) =>
    <Link to={url} className={`${styles.button} ${isActive ? styles.button_active : ""}`}>
        <span>{text}</span>
    </Link>;

export default LinkButton;
