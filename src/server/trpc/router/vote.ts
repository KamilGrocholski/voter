import { router, protectedProcedure } from "../trpc"
import { voteSchema } from "../schemas/voteSchema"

export const voteRouter = router({
    castProtected: protectedProcedure
        .input(voteSchema.create)
        .mutation(({ ctx, input }) => {
            const { votedForId, votedAgainstId } = input

            return ctx.prisma.vote.create({
                data: {
                    votedForId,
                    votedAgainstId,
                    voterId: ctx.session.user.id
                }
            })
        }), 
})
