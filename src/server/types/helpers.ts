import { z } from "zod";

export type InferSchemesObject<Obj extends Record<string, z.Schema>> = {
    [K in keyof Obj]: z.infer<Obj[K]>
}

export type PrismaToZod<Table extends Record<string, unknown>> = {
    [Column in keyof Table]: z.ZodType<Table[Column]>
}
