import { z } from "zod"
import { voteItemSchemaBase } from './voteItemSchema'
import { voteSetSchema, voteSetSchemaBase } from './voteSetSchema'
import { userSchemaBase } from './userSchema'
import { InferSchemesObject, PrismaToZod } from "../../types/helpers"
import { Vote } from "@prisma/client"

export type VoteSchemes = InferSchemesObject<typeof voteSchema>

const base = {
    id: z.string().cuid(),
    votedForId: voteItemSchemaBase.id,
    votedAgainstId: voteItemSchemaBase.id,
    voteSetId: voteSetSchemaBase.id
    // voterId: userSchemaBase.id,
    // createdAt: z.date()
}

export const voteSchema = {
    create: z.object({
        votedForId: base.votedForId,
        votedAgainstId: base.votedAgainstId,
        voteSetId: voteSetSchemaBase.id
    }),
    getUserVotes: z.object({
        voteSetId: voteSetSchemaBase.id.optional(),
        voterId: userSchemaBase.id
    }),
    getMyVotes: z.object({
        voteSetId: voteSetSchemaBase.id.optional()
    })
}

export {
    base as voteSchemaBase
}