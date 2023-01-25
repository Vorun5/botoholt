import styles from "./SongCard.module.css";
import Bloc from "../Bloc/Bloc";
import {SongPlaying} from "../../models/SongPlaying";
import {useTranslation} from "react-i18next";
import useEmote from "../../hooks/useEmote";

interface SongCardProps {
    song: SongPlaying;
}

const SongCard = ({song}: SongCardProps) => {
    const {t} = useTranslation();
    const {emote} = useEmote();

    return (
        <div className={styles.container}>
            <img className={styles.emote} src={song.isPlaying ? emote : "/emotes/PoroSad.png"} alt={"Dance emote"}
                 width="120px" height="120px"/>
            <Bloc width="40px"/>
            {
                song.nowPlayingName == null
                    ? <div className={styles.empty}>{t("song-card.empty")}</div>
                    : <div className={styles.song}>
                        <div>
                            <div className={styles.song__status}>
                                {song.isPlaying ? t("song-card.playing") : t("song-card.not-playing")}
                            </div>
                            <Bloc height="10px"/>
                            <a
                                className={styles.song__name}
                                href={song.nowPlayingLink != null ? song!.nowPlayingLink : "https://www.youtube.com/watch?v=UhvaUwtGyH4"}
                                target="_blank"
                            >
                                {song.nowPlayingName}
                            </a>
                        </div>
                        <Bloc height="10px"/>
                        <div className={styles.song__by}>
                            <div>
                                <div className={styles.by__label}>
                                    <img className={styles.by__icon} src="/emotes/peepoDJ.gif" alt="peepoDJ"/>
                                    {t("song-card.by")}<span className={styles.by__name}>{song.nowPlayingOwner}</span>
                                </div>
                            </div>
                            <div
                                className={styles.song__duration}>{`${Math.floor(song.nowPlayingDuration! / 60)}${t("minutes")} ${song.nowPlayingDuration! % 60}${t("seconds")}`}</div>
                        </div>
                    </div>
            }
        </div>
    );
}

export default SongCard;
