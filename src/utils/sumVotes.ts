export const sumSetVotes = (
    voteItems: {
        _count: {
            votesFor: number
            votesAgainst: number
        }
    }[]
) => {
    return voteItems.reduce((curr, prev) => {
        return curr + prev._count.votesAgainst
    }, 0)
}