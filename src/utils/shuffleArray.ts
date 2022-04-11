/**
 * 打乱数组
 * @see https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * @param arr your array
 * @returns shuffled array
 */
export function shuffle<T>(arr: Array<T>): Array<T> {
    let j, ele, i
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        ele = arr[i]
        arr[i] = arr[j]
        arr[j] = ele
    }
    return arr
}
