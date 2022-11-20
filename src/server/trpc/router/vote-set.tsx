import { router, publicProcedure, protectedProcedure } from "../trpc"
import { voteSetSchema } from "../schemas/voteSetSchema"
import { z } from "zod"
import { isVoteSetOwner } from "../../utils/isVoteSetOwner"

export const voteSetRouter = router({
    getAllByUserIdProtected: protectedProcedure
        .query(({ ctx }) => {
            return ctx.prisma.voteSet.findMany({
                where: {
                    ownerId: ctx.session.user.id
                },
                select: {
                    createdAt: true,
                    updatedAt: true,
                    id: true,
                    image: true,
                    name: true,
                    isPublished: true,
                    _count: {
                        select: {
                            likes: true,
                            dislikes: true,
                            voteItems: true
                        }
                    },
                    voteItems: {
                        select: {
                            _count: {
                                select: {
                                    votesAgainst: true,
                                    votesFor: true
                                }
                            }
                        }
                    }
                }
            })
        }),

    getAllPublic: publicProcedure
        .query(({ ctx }) => {
            return ctx.prisma.voteSet.findMany({
                where: {
                    isPublished: true
                }
            })
        }),

    getOneById: publicProcedure
        .input(z.object({
            voteSetId: z.string().cuid()
        }))
        .query(({ ctx, input }) => {
            const { voteSetId } = input

            return ctx.prisma.voteSet.findFirst({
                where: {
                    AND: {
                        id: voteSetId,
                        isPublished: true
                    }
                },
                select: {
                    id: true,
                    image: true,
                    name: true,
                    updatedAt: true,
                    createdAt: true,
                    owner: {
                        select: {
                            id: true,
                            name: true,
                            image: true
                        }
                    },
                    _count: {
                        select: {
                            likes: true,
                            dislikes: true,
                            voteItems: true
                        }
                    },
                    voteItems: {
                        select: {
                            id: true,
                            image: true,
                            name: true,
                            createdAt: true,
                            updatedAt: true,
                            _count: {
                                select: {
                                    votesAgainst: true,
                                    votesFor: true
                                }
                            }
                        }
                    }
                }
            })
        }),

    create: protectedProcedure
        .input(voteSetSchema.create)
        .mutation(({ ctx, input }) => {
            const { name, image, items } = input

            return ctx.prisma.voteSet.create({
                data: {
                    name,
                    image,
                    voteItems: {
                        create: items
                    },
                    ownerId: ctx.session.user.id
                }
            })
        }),

    update: protectedProcedure
        .input(voteSetSchema.update)
        .mutation(({ ctx, input }) => {
            const { name, image, isPublished, voteSetId } = input 
            isVoteSetOwner(ctx, voteSetId)

            return ctx.prisma.voteSet.update({
                where: {
                    id: voteSetId,
                },
                data: {
                    name,
                    image,
                    isPublished
                }
            })
        }),

    delete: protectedProcedure
        .input(voteSetSchema.delete)
        .mutation(({ ctx, input }) => {
            const { voteSetId } = input

            isVoteSetOwner(ctx, voteSetId)

            return ctx.prisma.voteSet.delete({
                where: {
                    id: voteSetId
                }
            })
        })
})
