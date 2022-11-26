import { VoteSetByIdPublic } from "../types/trpcOutputTypes";

export const sortByTopVotesForPercentage = (items: VoteSetByIdPublic['voteItems']): VoteSetByIdPublic['voteItems'] => {
    return items.sort((a, b) => (b._count.votesFor / b._count.votesAgainst) - (a._count.votesFor / a._count.votesAgainst))
}
