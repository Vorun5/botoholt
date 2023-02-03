import { useEffect, useState } from "react";
import { Streamer } from "models/Streamer";
import ApiService from "services/ApiService";

const useStreamers = () => {
  const [streamers, setStreamers] = useState<Array<Streamer>>([]);

  const getSteamers = () => {
    ApiService.getAllStreamers()
      .then((response) => setStreamers(response.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => getSteamers(), []);

  return { streamers };
};

export default useStreamers;
