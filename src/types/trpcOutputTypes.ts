import { GetInferenceHelpers } from "@trpc/server";
import { userRouter } from "../server/trpc/router/user";
import { voteRouter } from "../server/trpc/router/vote";
import { voteItemRouter } from "../server/trpc/router/vote-item";
import { voteSetRouter } from "../server/trpc/router/vote-set";

export type AllVoteSetsByUserIdProtected = GetInferenceHelpers<typeof voteSetRouter>['getAllByUserIdProtected']['output']

export type VoteSetByIdPublic = NonNullable<GetInferenceHelpers<typeof voteSetRouter>['getOneById']['output']>

export type MyVoteSetByIdProtected = NonNullable<GetInferenceHelpers<typeof voteSetRouter>['getMyVoteSetById']['output']>

export type VoteItemPair = GetInferenceHelpers<typeof voteItemRouter>['getPair']['output']

export type VotesSetsPagination = GetInferenceHelpers<typeof voteSetRouter>['getVoteSets']['output']

export type UserSmallInfoByIdPublic = NonNullable<GetInferenceHelpers<typeof userRouter>['getSmallInfoByIdPublic']['output']>

export type VotesSetsList = GetInferenceHelpers<typeof voteSetRouter>['getAllByUserIdPublic']['output']

export type UserInfoPublic = NonNullable<GetInferenceHelpers<typeof userRouter>['getSmallInfoByIdPublic']['output']>

