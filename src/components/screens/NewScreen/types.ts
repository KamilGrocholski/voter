import { VoteItem } from "@prisma/client";

export type PickVoteItem = Pick<VoteItem, 'name' | 'image'>
export type NewVoteItem = PickVoteItem & { index: number }