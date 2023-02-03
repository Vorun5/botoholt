import styles from "./StreamerPage.module.css";
import { useTranslation } from "react-i18next";
import { StreamerCard } from "components/StreamerCard/StreamerCard";
import SongCard from "components/SongCard/SongCard";
import CreateWith from "components/CreateWith/CreateWith";
import Loading from "components/Loading/Loading";
import ErrorPage from "pages/NotFoundPage/ErrorPage";
import SocialMedias from "components/SocialMedias/SocialMedias";
import useStreamerPage from "hooks/useStreamerPage";
import Navigation from "./components/Navigation";
import RouteList from "./components/RouteList";
import Ads from "./components/Ads";
import {
  queueToSongPlaying,
  StreamerPageProps,
  streamerSocialMedias,
} from "./common";

const StreamerPageDesktop = ({ streamer }: StreamerPageProps) => {
  const { t } = useTranslation();
  const { error, queue, queueIsEmpty, period, setSearchParams } =
    useStreamerPage(streamer);

  if (error)
    return (
      <ErrorPage
        text={t("streamer-page.not-have-songs", {
          login: streamer.display_name,
        })}
      />
    );

  if (queue == null) return <Loading />;

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.info__main}>
          <div className={styles.info__card}>
            <StreamerCard
              streamer={streamer}
              title={t("streamer-card.title")}
            />
          </div>
          <SocialMedias socialMedias={streamerSocialMedias(streamer)} />
        </div>
        <CreateWith />
      </div>
      <div className={styles.content}>
        <Navigation
          streamer={streamer}
          setSearchParams={setSearchParams}
          period={period}
        />
        <div className={styles.content__song}>
          <SongCard song={queueToSongPlaying(queue)} />
        </div>
        <div className={styles.content__main}>
          <Ads daLink={streamer.daLink} />
          <div className={styles.main__divider} />
          <RouteList
            queueIsEmpty={queueIsEmpty}
            period={period}
            streamer={streamer}
            queue={queue.queueList}
          />
        </div>
      </div>
    </div>
  );
};

export default StreamerPageDesktop;
