import {useTranslation} from "react-i18next";
import SongList from "./SongList";
import useHistory from "../../hooks/useHistory";

interface HistoryListProps {
    streamerLogin: string;
}

const HistoryList = ({streamerLogin}: HistoryListProps) => {
    const {history} = useHistory(streamerLogin);
    const {t} = useTranslation();

    return (
        <SongList
            title={t("streamer-page.tab-titles.history")}
            items={history.map((song, index) => {
                return {
                    mediaName: song.mediaName,
                    mediaLink: song.mediaLink,
                    requestedBy: song.requestedBy,
                    number: index + 1,
                    extraText: "Вс 17",
                }
            })}
        />
    );
}

export default HistoryList;
