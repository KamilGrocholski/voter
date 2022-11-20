import { z } from "zod"
import { base as voteItemSchema } from './voteItemSchema'
import { base as voteSetSchema } from './voteSetSchema'
import { base as userSchema } from './userSchema'

export type CastVoteSchema = z.infer<typeof voteSchema.create>

const base = {
    id: z.string().cuid(),
    votedForId: voteItemSchema.id,
    votedAgainstId: voteItemSchema.id,
    voterId: userSchema.id
}

export const voteSchema = {
    create: z.object({
        votedForId: base.votedForId,
        votedAgainstId: base.votedAgainstId,
        voteSetId: voteSetSchema.id
    })
}