import { z } from 'zod'

const base = {
    id: z.string().cuid(),
    name: z.string().min(1),
    image: z.string().url().optional()
}

export {
    base as userSchemaBase
}