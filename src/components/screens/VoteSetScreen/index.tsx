import { VoteItem } from "@prisma/client"
import { useRouter } from "next/router"
import MainLayout from "../../../layouts/MainLayout"
import { trpc } from "../../../utils/trpc"
import EmptyStateWrapper from "../../common/EmptyStateWrapper"
import VoteSetHero from "./components/Hero"
import ItemsList from "./components/ItemsList"

const VoteSetScreen: React.FC = () => {
    const router = useRouter()
    const { voteSetId } = router.query as { voteSetId: VoteItem['id'] }
    const voteSet = trpc.voteSet.getOneById.useQuery(voteSetId)

    return (
        <MainLayout useContainer={false}>
            {voteSet.data ?(
                <VoteSetHero  {...voteSet.data} />
            ) : (
                <div>xd2</div>
            )}
            <EmptyStateWrapper 
                data={voteSet.data}
                isLoading={voteSet.isLoading}
                NonEmptyComponent={<ItemsList voteItemsList={voteSet.data?.voteItems ?? []} />}
                EmptyComponent={<div>xd</div>}
            />
        </MainLayout>
    )
}

export default VoteSetScreen