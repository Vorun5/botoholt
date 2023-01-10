import styles from "./ToggleLanguage.module.css";
import {useTranslation} from "react-i18next";

const ToggleLanguage = () => {
    const {i18n} = useTranslation();
    const changeLanguage = (language: string) => i18n.changeLanguage(language);
    return <div
        className={styles.container}
        onClick={() => changeLanguage(i18n.language === "ru" ? "en" : "ru")}
    >
        {(i18n.language) === "ru" ? "ENG" : "RU"}
    </div>
}

export default ToggleLanguage;
