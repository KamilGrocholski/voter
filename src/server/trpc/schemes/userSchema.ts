import { z } from 'zod'
import { InferSchemesObject } from '../../types/helpers'

export type UserSchemes = InferSchemesObject<typeof userSchema>

const base = {
    id: z.string().cuid(),
    name: z.string().min(1),
    image: z.string().url().optional()
}

export const userSchema = {

}

export {
    base as userSchemaBase
}