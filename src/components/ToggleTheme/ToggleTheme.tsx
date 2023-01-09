import {HandySvg} from "handy-svg";
import {useTheme} from "../../hooks/useTheme";
import styles from "./ToggleTheme.module.css";

const ToggleTheme = () => {
    const [theme, handleChange] = useTheme();

    return (
        <div className={styles.container}
             onClick={() => handleChange(theme === 'dark' ? 'light' : 'dark')}
        >
            <div className={styles.label}>Сменить тему</div>
            <HandySvg className={styles.icon} src={theme === 'dark' ? "icons/moon.svg" : "icons/sun.svg"} width="32" height="32"/>
        </div>)
}

export default ToggleTheme;
