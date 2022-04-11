export function setTitle(newTitle: string, noSuffix?: boolean): void {
    document.title = newTitle
    if (!noSuffix) document.title += ` - ${require('themeConfig').appName}`
}

export function isTitleEmpty(): boolean {
    return document.title === '\u200E'
}

export function emptyTitle(): void {
    document.title = '\u200E'
}
