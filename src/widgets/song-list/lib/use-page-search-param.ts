import { SONG_LIMIT } from 'entities/streamer-song-data';

export const usePageSearchParam = ({ from, searchParams }: { from: number; searchParams: URLSearchParams }) => {
    const pageParam = searchParams.get('page')
    let page = 1
    if (from != -1) {
        page = from / SONG_LIMIT + 1
        return 1
    }
    if (pageParam !== null) {
        try {
            page = Number.parseInt(pageParam)
            if (Number.isNaN(page) || page < 1) {
                return 1
            }
        } catch {
            console.log('Failed to parse page number')
            return 1
        }
    }

    return page
}
