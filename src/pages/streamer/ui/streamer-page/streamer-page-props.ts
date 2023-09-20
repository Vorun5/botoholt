import { SongListProps } from 'widgets/song-list/ui'
import { Streamer } from 'shared/types'

export type StreamerPageProps = Omit<SongListProps, 'login'> & { streamer: Streamer }
