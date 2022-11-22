import { router, publicProcedure, protectedProcedure } from "../trpc"
import { voteSetSchema } from "../schemas/voteSetSchema"
import { voteSetSchemaBase } from '../schemas/voteSetSchema'
import { isVoteSetOwner } from "../../utils/isVoteSetOwner"
import { TRPCError } from "@trpc/server"
import { createDateFromNow } from "../../utils/createDateFromNow"
import { voteSetSelects } from "../../utils/selects/voteSetSelect"

export const voteSetRouter = router({
    getRecentlyPopular: publicProcedure
        .query(({ ctx }) => {
            return ctx.prisma.voteSet.findMany({
                where: {
                    isPublished: true,
                    createdAt: {
                        gte: createDateFromNow('past', {
                            week: 2
                        })
                    }
                },
                orderBy: {
                    likes: {
                        _count: 'desc'
                    }
                },
                select: voteSetSelects.publicMainSelect
            })
        }),

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
        .input(voteSetSchemaBase.id)
        .query(({ ctx, input: voteSetId }) => {

            return ctx.prisma.voteSet.findFirst({
                where: {
                    AND: {
                        id: voteSetId,
                        isPublished: true
                    }
                },
                select: voteSetSelects.publicMainSelect
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
        .mutation(async ({ ctx, input }) => {
            const { name, image, isPublished, voteSetId } = input 
            isVoteSetOwner(ctx, voteSetId)

            const itemsCounter = await ctx.prisma.voteSet.findUnique({
                where: {
                    id: voteSetId
                },
                select: {
                    _count: {
                        select: {
                            voteItems: true
                        }
                    }
                }
            }) 

            if (!itemsCounter || itemsCounter._count.voteItems < 2) {
                throw new TRPCError({ code: 'FORBIDDEN' })
            }

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
        }),

    pagination: publicProcedure
        .input(voteSetSchema.pagination)
        .query(({ ctx, input }) => {
            const { cursor, take } = input

            return ctx.prisma.voteSet.findMany({
                where: {
                    isPublished: true   
                },
                // take,
                // cursor: {
                    // id: cursor
                // },
                select: voteSetSelects.publicMainSelect
            })
        }),

        likeDislike: protectedProcedure
            .input(voteSetSchema.likeDislike)
            .mutation(async ({ ctx, input }) => {
                const { voteSetId, action } = input
                const userId = ctx.session.user.id 

                const foundVoteSet = await ctx.prisma.voteSet.findUnique({
                    where: {
                        id: voteSetId
                    }
                }) 

                if (foundVoteSet?.ownerId === userId) {
                    throw new TRPCError({ code: 'FORBIDDEN' })
                } 

                const foundLike = await ctx.prisma.voteSetLike.findFirst({
                    where: {
                        AND: {
                            userId,
                            voteSetId
                        }
                    }
                })

                const foundDislike = await ctx.prisma.voteSetDislike.findFirst({
                    where: {
                        AND: {
                            userId,
                            voteSetId
                        }
                    }
                })

                if (action === 'like') {

                    if (!foundLike && !foundDislike) {
                        return ctx.prisma.voteSetLike.create({
                            data: {
                                voteSetId,
                                userId
                            }
                        })
                    }

                    if (!foundLike && foundDislike) {
                        await ctx.prisma.voteSetDislike.delete({
                            where: {
                                id: foundDislike.id
                            }
                        })
                        return ctx.prisma.voteSetLike.create({
                            data: {
                                voteSetId,
                                userId
                            }
                        })
                    }
                }

                else if (action === 'dislike') {
                    if (!foundLike && !foundDislike) {
                        return ctx.prisma.voteSetDislike.create({
                            data: {
                                voteSetId,
                                userId
                            }
                        })
                    }

                    if (foundLike && !foundDislike) {
                        await ctx.prisma.voteSetLike.delete({
                            where: {
                                id: foundLike.id
                            }
                        })
                        return ctx.prisma.voteSetDislike.create({
                            data: {
                                voteSetId,
                                userId
                            }
                        })
                    }
                }
            }),
})

