import { VoteSet } from "@prisma/client";
import { z } from "zod";
import { PrismaToZod, InferSchemesObject } from "../../types/helpers";
import { userSchemaBase } from "./userSchema";
import { voteItemSchema } from "./voteItemSchema";

export type VoteSetSchemes = InferSchemesObject<typeof voteItemSchema>

const base = {
    id: z.string().cuid(),
    name: z.string().min(5).max(20),
    image: z.string().url(),
    isPublished: z.boolean(),
    // createdAt: z.date(),
    // updatedAt: z.date(),
    // ownerId: userSchemaBase.id
}

const voteSetSchema = {
    create: z.object({
        name: base.name,
        image: base.image,
        items: z.array(voteItemSchema.create)
    }),
    update: z.object({
        voteSetId: base.id,
        name: z.optional(base.name),
        image: z.optional(base.image),
        isPublished: z.optional(base.isPublished)
    }),
    delete: z.object({
        voteSetId: base.id
    }),
    pagination: z.object({
        take: z.number().min(1).max(100).optional(),
        cursor: z.optional(base.id)
    }),
    likeDislike: z.object({
        voteSetId: base.id,
        action: z.enum(['like', 'dislike'])
    })
}

export {
    base as voteSetSchemaBase,
    voteSetSchema
}