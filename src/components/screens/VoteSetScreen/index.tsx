import { VoteItem } from "@prisma/client"
import { useRouter } from "next/router"
import MainLayout from "../../../layouts/MainLayout"
import { trpc } from "../../../utils/trpc"
import EmptyStateWrapper from "../../common/EmptyStateWrapper"
import VoteSetHero from "./components/Hero"
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
                    isError={voteSet.isError}
                    ErrorComponent={
                        <span className='text-indicative-danger'>
                            An error has occured!
                            <button
                                onClick={() => voteSet.refetch()}
                                className='btn ml-3 text-indicative-success hover:border-indicative-error'
                            >
                                Try again
                            </button>
                        </span>
                    }
                    NonEmptyComponent={(nonEmptyVoteSet) => (
                        <>
                            <VoteSetHero {...nonEmptyVoteSet} />
                            <ItemsRanking items={nonEmptyVoteSet.voteItems} />
                        </>
                    )}
                    EmptyComponent={<div>There are no vote sets.</div>}
                />
            </div>
        </MainLayout>
    )
}

export default VoteSetScreen
