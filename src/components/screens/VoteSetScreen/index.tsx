import { VoteItem } from "@prisma/client"
import { useRouter } from "next/router"
import MainLayout from "../../../layouts/MainLayout"
import { trpc } from "../../../utils/trpc"
import EmptyStateWrapper from "../../common/EmptyStateWrapper"
import VoteSetHero, { VoteSetHeroProps } from "./components/Hero"
import ItemsRanking from "./components/ItemsRanking"

const VoteSetScreen: React.FC = () => {
    const router = useRouter()
    const { voteSetId } = router.query as { voteSetId: VoteItem['id'] }
    const voteSet = trpc.voteSet.getOneById.useQuery(voteSetId)

    return (
        <MainLayout useContainer={true}>
            <div className='flex flex-col space-y-3'>
                <EmptyStateWrapper 
                    data={voteSet.data}
                    isLoading={voteSet.isLoading}
                    NonEmptyComponent={<VoteSetHero {...voteSet.data as VoteSetHeroProps } />}
                    EmptyComponent={<div>xd</div>}
                />
                <EmptyStateWrapper 
                    data={voteSet.data}
                    isLoading={voteSet.isLoading}
                    NonEmptyComponent={<ItemsRanking items={voteSet.data?.voteItems ?? []} />}
                    EmptyComponent={<div>xd</div>}
                />
            </div>
        </MainLayout>
    )
}

export default VoteSetScreen