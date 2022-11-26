export const getVotesPercentage = (votesFor: number, votesAgainst: number): number => {
    const sum = votesFor + votesAgainst

    if (sum === 0) return 0

    const percentage = (votesFor / sum) * 100
    const rounded = Math.round((percentage + Number.EPSILON) * 100) / 100
    
    return rounded
}