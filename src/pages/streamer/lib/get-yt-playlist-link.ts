export const getYtPlaylistLink = (ytLinks: string[]) => {
    let ytPlaylistLink: string | null = ''
    if (ytLinks.length !== 0) {
        for (const ytLink of ytLinks) {
            const url = new URL(ytLink)
            const id = url.searchParams.get('v')
            if (id !== null) {
                ytPlaylistLink = ytPlaylistLink + id + ','
            }
        }
        if (ytPlaylistLink.length !== 0) {
            ytPlaylistLink = 'https://www.youtube.com/watch_videos?video_ids=' + ytPlaylistLink.slice(0, -1)
        }
    }

    return ytPlaylistLink === '' ? null : ytPlaylistLink
}
