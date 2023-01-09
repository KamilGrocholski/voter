import { router, publicProcedure, protectedProcedure } from "../trpc"
import { voteSetSchema } from "../schemes/voteSetSchema"
import { voteSetSchemaBase } from '../schemes/voteSetSchema'
import { isVoteSetOwner } from "../../utils/isVoteSetOwner"
import { TRPCError } from "@trpc/server"
import { createDateFromNow } from "../../utils/createDateFromNow"
import { voteSetSelects } from "../../utils/selects/voteSetSelect"
import { deleteImage, uploadImage } from "../../lib/cloudinary"
import { userSchemaBase } from "../schemes/userSchema"
import { z } from "zod"
import { isMaxVoteSets } from "../../utils/isMaxVoteSets"

export const voteSetRouter = router({
    getVoteSets: publicProcedure
        .input(voteSetSchema.filter)
        .query(async ({ ctx, input }) => {
            const { name, createdAt, orderBy, cursor, take } = input

            const voteSets = await ctx.prisma.voteSet.findMany({
                take: take + 1,
                where: {
                    isPublished: true,
                    name: {
                        startsWith: name
                    },
                    createdAt: createdAt !== undefined ? {
                        gte: createDateFromNow('past', createdAt)
                    } : undefined
                },
                cursor: cursor ? { id: cursor } : undefined,
                orderBy: {
                    likes: orderBy === 'LIKES' ? {
                        _count: 'desc'
                    } : undefined,
                    voteItems: orderBy === 'ITEMS' ? {
                        _count: 'desc'
                    } : undefined,
                },
                select: voteSetSelects.publicMainSelect
            })

            let nextCursor: typeof cursor | undefined = undefined
            if (voteSets.length > take) {
                const nextItem = voteSets.pop()
                nextCursor = nextItem?.id
            }

            return {
                voteSets,
                nextCursor
            }
        }),

    getNamesPublic: publicProcedure
        .input(z.string())
        .query(({ ctx, input: startsWith }) => {
            return ctx.prisma.voteSet.findMany({
                where: {
                    isPublished: true,
                    name: {
                        startsWith
                    }
                },
                select: {
                    name: true
                }
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

    getAllByUserIdPublic: publicProcedure
        .input(userSchemaBase.id)
        .query(({ ctx, input: userId }) => {

            return ctx.prisma.voteSet.findMany({
                where: {
                    AND: {
                        ownerId: userId,
                        isPublished: true
                    }
                },
                select: voteSetSelects.publicMainSelect
            })
        }),

    create: protectedProcedure
        .input(voteSetSchema.create)
        .mutation(async ({ ctx, input }) => {
            await isMaxVoteSets(ctx)

            const { name, image, items } = input

            const uploadResultUrl = await uploadImage(image)

            const itemsUploadResultUrls = await Promise.all(
                items.map((item) => uploadImage(item.image))
            )

            if (!uploadResultUrl || !itemsUploadResultUrls) {
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
            }

            return ctx.prisma.voteSet.create({
                data: {
                    name,
                    image: uploadResultUrl,
                    voteItems: {
                        create: items.map((item, i) => {
                            return {
                                name: item.name,
                                image: itemsUploadResultUrls[i]
                            }
                        }) as typeof items
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

            const uploadResultUrl = image ? await uploadImage(image) : undefined

            return ctx.prisma.voteSet.update({
                where: {
                    id: voteSetId,
                },
                data: {
                    name,
                    image: uploadResultUrl,
                    isPublished
                }
            })
        }),

    delete: protectedProcedure
        .input(voteSetSchema.delete)
        .mutation(async ({ ctx, input }) => {
            const { voteSetId } = input

            isVoteSetOwner(ctx, voteSetId)

            const deletedSet = await ctx.prisma.voteSet.delete({
                where: {
                    id: voteSetId
                },
                select: {
                    image: true
                }
            })

            if (deletedSet) {
                await deleteImage(deletedSet.image)
            }

            return deletedSet
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

