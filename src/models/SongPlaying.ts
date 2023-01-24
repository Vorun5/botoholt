export interface SongPlaying {
    isPlaying: boolean;
    nowPlayingName: string | null;
    nowPlayingLink: string | null;
    nowPlayingStartsFrom: number | null;
    nowPlayingDuration: number | null;
    nowPlayingOwner: string | null;
}
