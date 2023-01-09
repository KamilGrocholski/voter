import { router, publicProcedure, protectedProcedure } from "../trpc"
import getTwoDifferentRandomInts from "../../../utils/getTwoDifferentRandomInts"
import { voteItemSchema } from "../schemes/voteItemSchema"
import { voteSetSchemaBase } from '../schemes/voteSetSchema'
import { isVoteItemOwner } from "../../utils/isVoteItemOwner"
import { isVoteSetOwner } from "../../utils/isVoteSetOwner"
import { isMaxVoteItems } from "../../utils/isMaxVoteItems"

export const voteItemRouter = router({
    getPair: publicProcedure
        .input(voteSetSchemaBase.id)
        .query(async ({ ctx, input: voteSetId }) => {

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

    create: protectedProcedure
        .input(voteItemSchema.createAlone)
        .mutation(async ({ ctx, input }) => {
            const { name, image, voteSetId } = input

            await isVoteSetOwner(ctx, voteSetId)

            await isMaxVoteItems(ctx, voteSetId)

            return ctx.prisma.voteItem.create({
                data: {
                    name,
                    image,
                    voteSetId
                }
            })
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
