import { TRPCError } from '@trpc/server';
import { Context } from '../trpc/context';

export const isVoteItemOwner = async (
  ctx: Context,
  voteItemId: string
) => {
  const voteItem = await ctx.prisma.voteItem.findUnique({
    where: {
      id: voteItemId,
    },
    include: {
        voteSet: true
    }
  })

  if (!voteItem || ctx.session?.user?.id !== voteItem.voteSet.ownerId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
}