import { CastVoteSchema } from "../../../server/trpc/schemas/voteSchema";
import { VoteItemPair } from "../../../types/trpcOutputTypes";

export type HandleCastVote = (params: CastVoteSchema) => void

export type VoteItem = VoteItemPair['firstItem']

export type VotePairUndefined = VoteItemPair | undefined