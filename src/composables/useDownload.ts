export function useDownload(href: string, fileName: string): void {
    const link = document.createElement('a')
    link.download = fileName || ''
    link.href = href
    link.click()
}
