import { z } from "zod"
import { voteItemSchemaBase } from './voteItemSchema'
import { voteSetSchemaBase } from './voteSetSchema'
import { userSchemaBase } from './userSchema'

export type CastVoteSchema = z.infer<typeof voteSchema.create>

const base = {
    id: z.string().cuid(),
    votedForId: voteItemSchemaBase.id,
    votedAgainstId: voteItemSchemaBase.id,
    voterId: userSchemaBase.id
}

export const voteSchema = {
    create: z.object({
        votedForId: base.votedForId,
        votedAgainstId: base.votedAgainstId,
        voteSetId: voteSetSchemaBase.id
    })
}

export {
    base as voteSchemaBase
}