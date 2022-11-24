import { z } from "zod"
import { voteItemSchemaBase } from './voteItemSchema'
import { voteSetSchemaBase } from './voteSetSchema'
import { userSchemaBase } from './userSchema'
import { InferSchemesObject, PrismaToZod } from "../../types/helpers"
import { Vote } from "@prisma/client"

export type VoteSchemes = InferSchemesObject<typeof voteSchema>

const base: PrismaToZod<Vote> = {
    id: z.string().cuid(),
    votedForId: voteItemSchemaBase.id,
    votedAgainstId: voteItemSchemaBase.id,
    voterId: userSchemaBase.id,
    createdAt: z.date()
}

export const voteSchema = {
    create: z.object({
        votedForId: base.votedForId,
        votedAgainstId: base.votedAgainstId,
        voteSetId: voteSetSchemaBase.id
    })
} as const

export {
    base as voteSchemaBase
}