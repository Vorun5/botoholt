import { QueueSong } from "models/QueueSong";

export interface QueueListProps {
  items: QueueSong[];
  queueIsEmpty: boolean;
}
