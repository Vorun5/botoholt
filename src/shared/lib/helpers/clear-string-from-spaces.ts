export const clearStringFromSpaces = (str?: string) => {
    if (!str) return ''
    return str.trim().replace(/\s+/g, ' ');
}
