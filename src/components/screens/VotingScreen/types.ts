import { VoteSchemes } from "../../../server/trpc/schemes/voteSchema";
import { VoteItemPair } from "../../../types/trpcOutputTypes";

export type HandleCastVote = (params: VoteSchemes['create']) => void

export type VoteItem = VoteItemPair['firstItem']

export type VotePairUndefined = VoteItemPair | undefined