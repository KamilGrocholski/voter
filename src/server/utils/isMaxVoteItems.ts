import { VoteSet } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { Context } from '../trpc/context';

export const isMaxVoteItems = async (
  ctx: Context,
  voteSetId: VoteSet['id']
) => {
  const voteItemsCount = await ctx.prisma.voteItem.count({
    where: {
        voteSetId
    }
  })

  if (!voteItemsCount) {
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
  }

  if (voteItemsCount > 255) {
    throw new TRPCError({ code: 'FORBIDDEN', message: `You can not have more than ${255} vote items in a vote set`  })
  } 
}