import { GetInferenceHelpers } from "@trpc/server";
import { voteItemRouter } from "../server/trpc/router/vote-item";
import { voteSetRouter } from "../server/trpc/router/vote-set";

export type AllVoteSetsByUserIdProtected = GetInferenceHelpers<typeof voteSetRouter>['getAllByUserIdProtected']['output']

export type VoteSetByIdPublic = NonNullable<GetInferenceHelpers<typeof voteSetRouter>['getOneById']['output']>

export type VoteItemPair = GetInferenceHelpers<typeof voteItemRouter>['getPair']['output']

export type VotesSetsPagination = GetInferenceHelpers<typeof voteSetRouter>['pagination']['output']