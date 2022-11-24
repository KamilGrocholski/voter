import { z } from "zod"

export type InferSchemesObject<Obj extends Record<string, z.Schema>> = {
    [K in keyof Obj]: z.infer<Obj[K]>
}

export type PrismaToZod<Table extends Record<string, unknown>> = {
    [Column in keyof Table]: z.ZodType<ChangeNullToUndefined<Table[Column]>>
}

export type ChangeNullToUndefined<T> = T extends null ? NonNullable<T> | undefined : T
export type ChangeUndefinedToNull<T> = T extends undefined ? NonNullable<T> | null : T
export type SwapNullUndefined<T> = T extends null 
    ? NonNullable<T> | undefined
    : T extends undefined 
        ? NonNullable<T> | null
        : T
