import styles from "./ToggleTheme.module.css";
import {HandySvg} from "handy-svg";
import {useTheme} from "../../hooks/useTheme";
import {useTranslation} from "react-i18next";

const ToggleTheme = () => {
    const {t} = useTranslation();
    const [theme, handleChange] = useTheme();

    return (
        <div className={styles.container} onClick={() => handleChange(theme === "dark" ? "light" : "dark")}>
            <div className={styles.label}>{t("header.change-theme")}</div>
            <HandySvg
                className={styles.icon}
                src={theme === "dark" ? "../icons/moon.svg" : "../icons/sun.svg"}
                width="32"
                height="32"
            />
        </div>
    );
}

export default ToggleTheme;
