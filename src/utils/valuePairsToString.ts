export const valuePairsToString = (valuePairs: Record<string, string>): string => {
    return Object.values(valuePairs).reduce((acc, curr) => acc + ' ' + curr, '')
}