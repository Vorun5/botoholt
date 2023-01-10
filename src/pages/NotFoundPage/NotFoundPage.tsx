import styles from "./NotFoundPage.module.css";
import {useTranslation} from "react-i18next";

const NotFoundPage = () => {
    const {t} = useTranslation();

    return <div className={styles.container}>{t("page-not-found")}</div>
}

export default NotFoundPage;
