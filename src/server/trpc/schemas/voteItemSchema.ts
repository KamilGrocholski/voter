import { z } from 'zod'

export const base = {
    id: z.string().cuid(),
    name: z.string().min(1),
    image: z.string().url()
}

export const voteItemSchema = {
    create: z.object({
        name: base.name,
        image: base.image
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
