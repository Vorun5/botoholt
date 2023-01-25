import {Period} from "../../types";
import TopList from "./TopList";
import useTopSongs from "../../hooks/useTopSongs";
import {useTranslation} from "react-i18next";

interface TopSongsListProps {
    streamerLogin: string;
    period: Period;
}

const TopSongs = ({streamerLogin, period}: TopSongsListProps) => {
    const {t} = useTranslation();
    const {topSongs} = useTopSongs(streamerLogin, period);

    return (
        <TopList
            title={t("streamer-page.tab-titles.top-songs")}
            items={topSongs.map((topSong, index) => {
                return {
                    text: topSong.mediaName,
                    number: index + 1,
                    count: topSong.count,
                    link: topSong.mediaLink,
                }
            })}
        />
    );
}

export default TopSongs;
