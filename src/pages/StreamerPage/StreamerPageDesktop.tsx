import styles from "./StreamerPage.module.css";
import {useTranslation} from "react-i18next";
import Bloc from "../../components/Bloc/Bloc";
import {StreamerCard} from "../../components/StreamerCard/StreamerCard";
import {Streamer} from "../../models/Streamer";
import Button from "../../components/Button/Button";
import {Route, Routes} from "react-router-dom";
import SongCard from "../../components/SongCard/SongCard";
import CreateWith from "../../components/CreateWith/CreateWith";
import Ad from "../../components/Ad/Ad";

interface StreamerPageDesktopProps {
    streamer: Streamer;
}

const StreamerPageDesktop = ({streamer}: StreamerPageDesktopProps) => {
    const {t} = useTranslation();

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div>
                    <div>
                        <StreamerCard streamer={streamer} title={t("streamer-card.title")}/>
                    </div>
                    <div className={styles.info__links}></div>
                </div>
                <CreateWith/>
            </div>

            <div className={styles.content}>

                <div className={styles.content__navigation}>
                    <div className={styles.navigation__tabs}>
                        <div><Button isActive={false} text="Очередь"/></div>
                        <div><Button isActive={false} text="История"/></div>
                        <div><Button isActive={false} text="Топ Диджеев"/></div>
                        <div><Button isActive={false} text="Топ песен"/></div>
                    </div>
                    <div className={styles.navigation__filters}>
                        <span className={styles.filters__title}>Фильтр</span>
                        <Bloc width="20px"/>
                        <div className={styles.filters__buttons}>
                            <div><Button isActive={false} text="Неделя"/></div>
                            <div><Button isActive={true} text="Месяц"/></div>
                            <div><Button isActive={false} text="Всё время"/></div>
                        </div>
                    </div>
                </div>


                <div className={styles.content__song}>
                    <SongCard/>
                </div>

                <div className={styles.content__main}>

                    <div className={styles.main__board}>
                        <div className={styles.board__item}>
                            <Ad
                                text="Хочешь заказать трек или поддержать стримера?"
                                bthIcon="../icons/da-hover.svg"
                                bthHoverIcon="../icons/da-hover.svg"
                                icon="../emotes/money.gif"
                                bthText="Поддержать денюжкой"
                                style="secondary"
                            />
                        </div>
                        <Bloc height="30px"/>
                        <div className={styles.board__item}>
                            <Ad
                                text="Хочешь добавть бота к себе на стрим?"
                                bthIcon="../icons/star-hover.svg"
                                bthHoverIcon="../icons/star-hover.svg"
                                icon="../emotes/EZ.png"
                                bthText="Купить подписку бота"
                                style="primary"
                            />
                        </div>
                    </div>

                    <div className={styles.main__divider}></div>

                    <div className={styles.main__list}>
                        <Routes>
                            <Route path="/" element={
                                <div className={styles.list__title}>
                                    Очередь песен
                                </div>
                            }/>
                            <Route path="/h" element={
                                <div className={styles.list__title}>
                                    история
                                </div>
                            }/>
                            <Route path="/top" element={
                                <div className={styles.list__title}>
                                    топ
                                </div>
                            }/>
                        </Routes>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default StreamerPageDesktop;
