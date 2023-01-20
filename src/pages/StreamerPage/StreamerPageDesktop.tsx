import styles from "./StreamerPage.module.css";
import {useTranslation} from "react-i18next";
import Bloc from "../../components/Bloc/Bloc";
import {StreamerCard} from "../../components/StreamerCard/StreamerCard";
import {Streamer} from "../../models/Streamer";
import Button from "../../components/Button/Button";

interface StreamerPageDesktopProps {
    streamer: Streamer;
}

const StreamerPageDesktop = ({streamer}: StreamerPageDesktopProps) => {
    const {t} = useTranslation();

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <StreamerCard streamer={streamer} title={t("streamer-card.title")}/>
            </div>
            <Bloc width="30px"/>
            <div className={styles.content}>

                <div className={styles.content__navigation}>
                    <div className={styles.navigation__tabs}>
                        <Button onClick={() => {
                        }} isActive={false} text="Очередь"/>
                        <Button onClick={() => {
                        }} isActive={false} text="История"/>
                        <Button onClick={() => {
                        }} isActive={false} text="Топ Диджеев"/>
                        <Button onClick={() => {
                        }} isActive={false} text="Топ песен"/>
                    </div>
                    <div className={styles.navigation__filters}>
                        <span className={styles.filters__title}>Фильтр</span>
                        <div className={styles.filters__buttons}>
                            <Button onClick={() => {
                            }} isActive={false} text="Неделя"/>
                            <Button onClick={() => {
                            }} isActive={true} text="Месяц"/>
                            <Button onClick={() => {
                            }} isActive={false} text="Всё время"/>
                        </div>
                    </div>
                </div>

                <div className={styles.content__song}></div>

                <div className={styles.content__main}>

                    <div className={styles.main__board}></div>

                    <div className={styles.main__divider}></div>

                    <div className={styles.main__list}>
                        <div className={styles.list__title}>
                            Очередь песен
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default StreamerPageDesktop;
