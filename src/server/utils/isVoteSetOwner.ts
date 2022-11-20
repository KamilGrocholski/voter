import { TRPCError } from '@trpc/server';
import { Context } from '../trpc/context';

export const isVoteSetOwner = async (
  ctx: Context,
  voteSetId: string
) => {
  const voteSet = await ctx.prisma.voteSet.findUnique({
    where: {
      id: voteSetId,
    }
  })

  if (!voteSet || ctx.session?.user?.id !== voteSet.ownerId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
}