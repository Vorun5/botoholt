export const getVideoPreview = (url: string | undefined): string | null => {
    if (!url) return null
    const pattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
    const match = url.match(pattern)

    if (match) {
        return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`
    } else {
        return null
    }
}
