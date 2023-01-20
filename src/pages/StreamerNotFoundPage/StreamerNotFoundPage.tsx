import styles from "./StreamerNotFoundPage.module.css";
import {useTranslation} from "react-i18next";
import { capitalize } from "../../utils";

interface StreamerNotFoundPageProps {
    login: string;
}

const StreamerNotFoundPage = ({login}: StreamerNotFoundPageProps) => {
    const {t} = useTranslation();

    return <div className={styles.container}>{t("streamer-not-found", {login: capitalize(login)})}</div>;
}

export default StreamerNotFoundPage;
