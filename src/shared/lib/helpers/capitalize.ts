export const capitalize = (str: string | undefined | null): string => {
    if (!str || str.length === 0) return ''

    const trimStr = str.trim()

    return trimStr.charAt(0).toUpperCase() + trimStr.slice(1)
}
