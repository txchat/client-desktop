export function getFileName(path?: string | null): string | undefined {
    const matchedFileName = path?.match(/\w+\.\w+$/g)
    let fileName: string | undefined
    if (matchedFileName && matchedFileName.length > 0) fileName = matchedFileName[0]
    return fileName
}
