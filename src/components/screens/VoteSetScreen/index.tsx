import { VoteItem } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import MainLayout from "../../../layouts/MainLayout"
import { trpc } from "../../../utils/trpc"
import EmptyStateWrapper from "../../common/EmptyStateWrapper"
import VoteSetHero from "./components/Hero"
import ItemsRanking from "./components/ItemsRanking"
import NewItemCreationModal from "./components/Owner/NewItemCreationModal"

const VoteSetScreen: React.FC = () => {
    const router = useRouter()
    const { voteSetId } = router.query as { voteSetId: VoteItem['id'] }
    const voteSet = trpc.voteSet.getOneById.useQuery(voteSetId)
    const [isCreatorOpen, setIsCreatorOpen] = useState<boolean>(false)
    const { data } = useSession()

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
                            {nonEmptyVoteSet.owner.id === data?.user?.id ?
                                <button
                                    onClick={() => setIsCreatorOpen(true)}
                                    className='btn mx-auto'
                                >
                                    <span className="flex flex-row space-x-3">
                                        <span>Create a new item</span>
                                        <span>
                                            {nonEmptyVoteSet._count.voteItems}
                                            <span>/255</span>
                                        </span>
                                    </span>
                                </button> : null}
                            <NewItemCreationModal
                                voteSetId={voteSetId}
                                setIsCreatorOpen={setIsCreatorOpen}
                                isCreatorOpen={isCreatorOpen}
                            />
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
