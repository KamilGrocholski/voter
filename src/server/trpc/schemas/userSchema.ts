import { z } from 'zod'

export const base = {
    id: z.string().cuid()
}