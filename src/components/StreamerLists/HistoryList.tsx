import {useTranslation} from "react-i18next";
import SongList from "./SongList";
import useHistory from "../../hooks/useHistory";
import {capitalize} from "../../utils";

interface HistoryListProps {
    streamerLogin: string;
}

const HistoryList = ({streamerLogin}: HistoryListProps) => {
    const {history} = useHistory(streamerLogin);
    const {t, i18n} = useTranslation();


    return (
        <SongList
            title={t("streamer-page.tab-titles.history")}
            items={history.map((song, index) => {
                const date = new Date(song.timeFrom);
                const formatDateWeek = new Intl.DateTimeFormat(i18n.language, {
                    weekday: 'short',
                }).format(date);
                const formatDateTime = new Intl.DateTimeFormat(i18n.language, {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false,
                }).format(date);

                return {
                    mediaName: song.mediaName,
                    mediaLink: song.mediaLink,
                    requestedBy: song.requestedBy,
                    number: index + 1,
                    extraText: `${formatDateTime} ${capitalize(formatDateWeek)}`,
                }
            })}
        />
    );
}

export default HistoryList;
