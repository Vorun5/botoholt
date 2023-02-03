import { useEffect, useState } from "react";
import SongListItem from "models/SongListItem";

const useSongListItemSearch = (items: SongListItem[]) => {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState(items);

  useEffect(() => {
    setSongs(
      items.filter(
        (item) =>
          item.mediaName.toLowerCase().includes(search.toLowerCase()) ||
          item.requestedBy.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, items]);

  return { search, setSearch, songs };
};

export default useSongListItemSearch;
