import { useEffect, useState } from "react";
import ApiService from "services/ApiService";
import { Period } from "types";
import TopSong from "models/TopSong";

const useTopSongs = (streamerLogin: string, period: Period) => {
  const [topSongs, setTopSongs] = useState<Array<TopSong>>([]);
  const [loading, setLoading] = useState(true);
  const [topSongsIsEmpty, setTopSongsIsEmpty] = useState(false);

  const getHistory = () => {
    ApiService.getStreamerTopSongs(streamerLogin, period)
      .then((response) => {
        setTopSongs(response.data);
        setTopSongsIsEmpty(response.data.length === 0);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    setLoading(true);
    getHistory();
  }, [streamerLogin, period]);

  return { topSongs, loading, topSongsIsEmpty };
};

export default useTopSongs;
