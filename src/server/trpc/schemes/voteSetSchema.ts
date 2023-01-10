import { z } from "zod";
import { InferSchemesObject } from "../../types/helpers";
import { userSchemaBase } from "./userSchema";
import { voteItemSchema } from "./voteItemSchema";

export type VoteSetSchemes = InferSchemesObject<typeof voteItemSchema>

const base = {
    id: z.string().cuid(),
    name: z.string({
        required_error: 'name must be in range from 5 to 45 characters',
        invalid_type_error: 'name must be a string'
    }).min(5).max(45),
    image: z.string().url(),
    isPublished: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    ownerId: userSchemaBase.id
}

const voteSetSchema = {
    filter: z.object({
        name: z.string().optional(),
        createdAt: z.object({
            'hour': z.number().optional(),   
            'minute': z.number().optional(),   
            'second': z.number().optional(),   
            'month': z.number().optional(),   
            'week': z.number().optional(),   
            'day': z.number().optional()
        }).optional(),
        orderBy: z.enum(['ITEMS', 'LIKES']),
        take: z.number().min(1).max(100),
        cursor: z.optional(base.id)
    }),
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
        take: z.number().min(1).max(100),
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