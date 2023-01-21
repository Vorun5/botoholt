import Bloc from "../Bloc/Bloc";
import styles from "./SongCard.module.css";
import {useEffect, useState} from "react";

const getRandomEmote = (): string => {
    const arr = ["catRAVE.gif", "RainbowPls.gif", "VIBE.gif", "DANCE.gif", "PartyKirby.gif", "pepeGuitar.gif"];
    return arr[Math.floor(Math.random() * arr.length)];
}

const SongCard = () => {
    // TODO: переделать под хук
    const [emote, setEmote] = useState("VIBE.gif");

    useEffect(() => {
        setEmote(getRandomEmote());
    }, []);

    return (
        <div className={styles.container}>
            <img className={styles.emote} src={`../emotes/${emote}`} alt={emote} width="120px" height="120px"/>
            <Bloc width="40px"/>
            <div className={styles.song}>
                <div>
                    <div className={styles.song__status}>Сейчас играет:</div>
                    <Bloc height="10px"/>
                    <a className={styles.song__name} href="https://www.youtube.com/watch?v=UhvaUwtGyH4" target="_blank">
                        Очень длинное название трека которое невозможно вместить в эту плашку
                    </a>
                </div>
                <Bloc height="10px"/>
                <div className={styles.song__by}>
                    <div>
                        <div className={styles.by__label}>
                            <img className={styles.by__icon} src="../emotes/peepoDJ.gif" alt="peepoDJ"/>
                            Заказ от: <span className={styles.by__name}> дядя смурф не откажите,попу покажитеееее</span>
                        </div>
                    </div>
                    <div className={styles.song__duration}>3м 25с</div>
                </div>
            </div>
        </div>
    );
}

export default SongCard;
