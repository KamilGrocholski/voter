import { User } from '@prisma/client'
import { z } from 'zod'
import { InferSchemesObject, PrismaToZod } from '../../types/helpers'

export type UserSchemes = InferSchemesObject<typeof userSchema>

const base = {
    id: z.string().cuid(),
    name: z.string().min(1),
    // image: z.string().url(),
    // email: z.string().email(),
    // emailVerified: z.date(),
    // role: z.string(),
}

export const userSchema = {

}

export {
    base as userSchemaBase
}