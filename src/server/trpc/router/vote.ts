import { router, protectedProcedure, publicProcedure } from "../trpc"
import { voteSchema } from "../schemes/voteSchema"
import { createDateFromNow } from "../../utils/createDateFromNow"

export const voteRouter = router({
    castProtected: protectedProcedure
        .input(voteSchema.create)
        .mutation(({ ctx, input }) => {
            const { votedForId, votedAgainstId, voteSetId } = input

            return ctx.prisma.vote.create({
                data: {
                    votedForId,
                    votedAgainstId,
                    voterId: ctx.session.user.id,
                    voteSetId
                }
            })
        }), 

    castPublic: publicProcedure
        .input(voteSchema.create)
        .mutation(({ ctx, input }) => {
            const { votedForId, votedAgainstId, voteSetId } = input

            return ctx.prisma.vote.create({
                data: {
                    votedForId,
                    votedAgainstId,
                    voteSetId
                }
            })
        }),

    getUserVotes: protectedProcedure
        .input(voteSchema.getUserVotes)
        .query(({ ctx, input }) => {
            const { voteSetId, voterId } = input
            return ctx.prisma.vote.findMany({
                where: {                 
                    voterId,   
                    voteSetId,
                },
                select: {
                    createdAt: true,
                    votedAgainst: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        }
                    },
                    votedFor: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        }
                    }
                }
            })
        }),

    getMyRecentVotes: protectedProcedure
        .input(voteSchema.getMyVotes)
        .query(({ ctx, input }) => {
            const { voteSetId } = input
            return ctx.prisma.vote.findMany({
                take: 20,
                orderBy: {
                    createdAt: 'desc'
                },
                where: {                 
                    voterId: ctx.session.user.id,   
                    voteSetId,
                },
                select: {
                    createdAt: true,
                    votedAgainst: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        }
                    },
                    votedFor: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        }
                    }
                }
            })
        }),

    countUserVotesPublic: publicProcedure
        .input(voteSchema.countUserVotesPublic)
        .query(({ ctx, input }) => {
            const { userId } = input
            return ctx.prisma.vote.groupBy({
                by: [
                    'createdAt'
                ],
                _count: {
                    createdAt: true
                },
                where: {
                    voterId: userId,
                    createdAt: {
                        gte: createDateFromNow('past', {
                            day: 7
                        })
                    }
                }
            })
        })
})
