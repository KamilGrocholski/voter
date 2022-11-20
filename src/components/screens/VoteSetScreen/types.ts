import { VoteSetByIdPublic } from "../../../types/trpcOutputTypes";

export type VoteSet = VoteSetByIdPublic
export type VoteItemsList = VoteSetByIdPublic['voteItems']
export type VoteItem = VoteSetByIdPublic['voteItems'][number]