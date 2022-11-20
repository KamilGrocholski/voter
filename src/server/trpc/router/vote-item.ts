import { router, publicProcedure, protectedProcedure } from "../trpc"
import { z } from "zod"
import getTwoDifferentRandomInts from "../../../utils/getTwoDifferentRandomInts"
import { voteItemSchema } from "../schemas/voteItemSchema"
import { isVoteItemOwner } from "../../utils/isVoteItemOwner"

export const voteItemRouter = router({
    getPair: publicProcedure
        .input(z.object({
            voteSetId: z.string().cuid()
        }))
        .query(async ({ ctx, input }) => {
            const { voteSetId } = input

            const foundItems = await ctx.prisma.voteItem.findMany({
                where: {
                    AND: {
                        voteSet: {
                            id: voteSetId,
                            isPublished: true
                        }
                    }
                },
                select: {
                    id: true,
                    image: true,
                    name: true
                }
            })

            const twoRandomIndexes = getTwoDifferentRandomInts(0, foundItems.length - 1)

            return { firstItem: foundItems[twoRandomIndexes[0]], secondItem: foundItems[twoRandomIndexes[1]] }
        }),

    update: protectedProcedure
        .input(voteItemSchema.update)
        .mutation(({ ctx, input }) => {
            const { voteItemId, name, image } = input
            
            isVoteItemOwner(ctx, voteItemId)

            return ctx.prisma.voteItem.update({
                where: {
                    id: voteItemId
                },
                data: {
                    name,
                    image
                }
            })
        }),
    

    delete: protectedProcedure
        .input(voteItemSchema.delete)
        .mutation(({ ctx, input }) => {
            const { voteItemId } = input

            isVoteItemOwner(ctx, voteItemId)

            return ctx.prisma.voteItem.delete({
                where: {
                    id: voteItemId
                }
            })
        })
})
