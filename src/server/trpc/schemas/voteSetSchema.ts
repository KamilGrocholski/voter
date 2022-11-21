import { z } from "zod";
import { voteItemSchema } from "./voteItemSchema";

export type VoteSetSchemaUpdate = z.infer<typeof voteSetSchema.update>

const base = {
    id: z.string().cuid(),
    name: z.string().min(5),
    image: z.string().url(),
    isPublished: z.boolean()
}

export const voteSetSchema = {
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
    })
}

export {
    base as voteSetSchemaBase
}