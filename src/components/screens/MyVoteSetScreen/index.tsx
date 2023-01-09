import { VoteSet } from '@prisma/client'
import { useRouter } from 'next/router'
import MainLayout from '../../../layouts/MainLayout'
import { trpc } from '../../../utils/trpc'
import EmptyStateWrapper from '../../common/EmptyStateWrapper'
import { Tabs } from './components/Tabs'

export const MyVoteSetScreen: React.FC = () => {
    const router = useRouter()
    const { voteSetId } = router.query as { voteSetId: VoteSet['id'] }

    const voteSetQuery = trpc.voteSet.getMyVoteSetById.useQuery(voteSetId)

    return (
        <MainLayout useContainer={false} usePadding={false}>
            <EmptyStateWrapper
                isError={voteSetQuery.isError}
                isLoading={voteSetQuery.isLoading}
                data={voteSetQuery.data}
                NonEmptyComponent={(voteSet) =>
                    <>
                        <Tabs {...voteSet} />
                    </>
                }
            />
        </MainLayout>
    )
}
