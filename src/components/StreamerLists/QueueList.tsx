import {QueueSong} from "../../models/QueueSong";
import {formatTime} from "../../utils";
import {useTranslation} from "react-i18next";
import SongList from "./SongList";
import EmptyListMessage from "./compontnts/EmptyListMessage/EmptyListMessage";

interface QueueListProps {
    items: QueueSong[];
    queueIsEmpty: boolean;
}

const QueueList = ({items, queueIsEmpty}: QueueListProps) => {
    const {t} = useTranslation();

    return (
        <SongList
            listIsEmpty={queueIsEmpty}
            title={t("streamer-page.tab-titles.queue")}
            emptyCard={
                <EmptyListMessage
                    mainText={t("streamer-page.list-is-empty.queue")}
                    text={t("streamer-page.list-is-empty.first")}
                />
            }
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
