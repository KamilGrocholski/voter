import { userSchema } from '../schemes/userSchema'
import { router, publicProcedure } from '../trpc'

export const userRouter = router({
    getSmallInfoByIdPublic: publicProcedure
        .input(userSchema.get)
        .query(({ctx, input}) => {
            const { id } = input

            return ctx.prisma.user.findUnique({
                where: {
                    id
                },
                select: {
                    id: true,
                    name: true,
                    image: true,
                    role: true,
                    //TODO createdAt: true,
                    _count: {
                        select: {
                            voteSets: true,
                            votes: true
                        }
                    }                 
                }
            })
        }),
})