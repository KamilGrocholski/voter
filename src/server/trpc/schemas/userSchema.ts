import { z } from 'zod'

const base = {
    id: z.string().cuid()
}

export {
    base as userSchemaBase
}