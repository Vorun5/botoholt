import {QueueSong} from "../../models/QueueSong";
import {formatTime} from "../../utils";
import {useTranslation} from "react-i18next";
import SongList from "./SongList";

interface QueueListProps {
    items: QueueSong[];
}

const QueueList = ({items}: QueueListProps) => {
    const {t} = useTranslation();

    return (
        <SongList
            loading={false}
            title={t("streamer-page.tab-titles.queue")}
            items={items.map((item, index) => {
                return {
                    mediaName: item.mediaName,
                    mediaLink: item.mediaLink,
                    requestedBy: item.requestedBy,
                    number: index + 1,
                    extraText: formatTime(item.duration, t),
                }
            })}
        />
    );
}

export default QueueList;
