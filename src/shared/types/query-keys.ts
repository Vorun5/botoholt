export const QueryKeys = {
    streamers: 'streamers',
    admin: 'admin',
    adminDaService: 'admin/donation',
    adminCommands: 'admin/commands',
    adminCustomCommands: 'admin/commands/custom',
    streamer: (login: string) => `streamer/${login}`,
    streamerSongQueue: (login: string) => `streamer/${login}/queue`,
    streamerSongHistory: (login: string) => `streamer/${login}/history`,
    streamerSongTopSong: (login: string) => `streamer/${login}/top-songs`,
    streamerSongTopDjs: (login: string) => `streamer/${login}/top-djs`,
}
