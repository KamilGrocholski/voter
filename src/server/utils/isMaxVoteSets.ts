import { TRPCError } from '@trpc/server';
import { Context } from '../trpc/context';

export const isMaxVoteSets = async (
  ctx: Context
) => {
  const voteSetsCount = await ctx.prisma.voteSet.count({
    where: {
        ownerId: ctx.session?.user?.id
    }
  })

  if (!voteSetsCount) {
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
  }

  if (voteSetsCount > 25) {
    throw new TRPCError({ code: 'FORBIDDEN', message: `You can not have more than ${25} vote sets`  })
  } 
}