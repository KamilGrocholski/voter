import { VoteItem } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import MainLayout from "../../../layouts/MainLayout"
import { trpc } from "../../../utils/trpc"
import EmptyStateWrapper from "../../common/EmptyStateWrapper"
import VoteSetHero, { VoteSetHeroProps } from "./components/Hero"
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
                    NonEmptyComponent={
                        <>
                            <VoteSetHero {...voteSet.data as VoteSetHeroProps} />
                            {voteSet.data?.owner.id === data?.user?.id ?
                                <button
                                    onClick={() => setIsCreatorOpen(true)}
                                    className='btn mx-auto'
                                >
                                    Create a new item
                                </button> : null}
                            <NewItemCreationModal
                                voteSetId={voteSetId}
                                setIsCreatorOpen={setIsCreatorOpen}
                                isCreatorOpen={isCreatorOpen}
                            />
                            <ItemsRanking items={voteSet.data?.voteItems ?? []} />
                        </>
                    }
                    EmptyComponent={<div>There are no vote sets.</div>}
                />
            </div>
        </MainLayout>
    )
}

export default VoteSetScreen
