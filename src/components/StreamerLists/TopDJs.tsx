import {Period} from "../../types";
import useTopDJs from "../../hooks/useTopDJs";
import TopList from "./TopList";
import {useTranslation} from "react-i18next";

interface TopDJsListProps {
    streamerLogin: string;
    period: Period;
}

const TopDJs = ({streamerLogin, period}: TopDJsListProps) => {
    const {t} = useTranslation();
    const {topDJs} = useTopDJs(streamerLogin, period);

    return (
        <TopList
            title={t("streamer-page.tab-titles.top-djs")}
            items={topDJs.map((topDJ, index) => {
                return {
                    text: topDJ.requestedBy,
                    number: index + 1,
                    count: topDJ.count,
                    link: null,
                }
            })}
        />
    );
}

export default TopDJs;
