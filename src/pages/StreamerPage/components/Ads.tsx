import styles from "../StreamerPage.module.css";
import Ad from "../../../components/Ad/Ad";
import {useTranslation} from "react-i18next";

interface AdsProps {
    daLink: string;
}

const Ads = ({daLink}: AdsProps) => {
    const {t} = useTranslation();

    return (
        <>
            <div className={styles.main__board}>
                <div className={styles.board__item}>
                    <Ad
                        text={t("support-streamer")}
                        bthIcon="/icons/da-hover.svg"
                        icon="/emotes/money.gif"
                        bthText={t("support-streamer-bth")}
                        adStyle="secondary"
                        bthOnClick={() => window.open(daLink)}
                    />
                </div>
                <div className={styles.board__item}>
                    <Ad
                        text={t("connect-bot")}
                        bthIcon="/icons/star-hover.svg"
                        icon="/emotes/EZ.png"
                        bthText={t("connect-bot-bth")}
                        adStyle="primary"
                        bthOnClick={() => window.open("https://www.youtube.com/watch?v=UhvaUwtGyH4")}
                    />
                </div>
            </div>
        </>
    );
}

export default Ads;
