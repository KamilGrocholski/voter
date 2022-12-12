import { VoteItem } from '@prisma/client'
import { z } from 'zod'
import { InferSchemesObject, PrismaToZod } from '../../types/helpers'
import { voteSetSchemaBase } from './voteSetSchema'

export type VoteItemSchemes = InferSchemesObject<typeof voteItemSchema>

const base = {
    id: z.string().cuid(),
    name: z.string().min(1),
    image: z.string().url(),
    // createdAt: z.date(),
    // updatedAt: z.date(),
    // voteSetId: voteSetSchemaBase.id
}

export const voteItemSchema = {
    create: z.object({
        name: base.name,
        image: base.image,
    }),
    createAlone: z.object({
                name: base.name,
        image: base.image,
        // voteSetId: voteSetSchemaBase.id
        voteSetId: z.string().cuid()
    }),
    update: z.object({
        voteItemId: base.id,
        name: z.optional(base.name),
        image: z.optional(base.image)
    }),
    delete: z.object({
        voteItemId: base.id
    })
}

export {
    base as voteItemSchemaBase
}