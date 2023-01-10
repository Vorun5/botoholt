import styles from "./StreamerNotFoundPage.module.css";
import {useTranslation} from "react-i18next";
import { capitalize } from "../../utils";

const StreamerNotFoundPage = ({login}: { login: string }) => {
    const {t} = useTranslation();

    return <div className={styles.container}>{t("streamer-not-found", {login: capitalize(login)})}</div>
}

export default StreamerNotFoundPage;
