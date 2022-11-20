import { useRouter } from "next/router"
import { useEffect } from "react"
import MainLayout from "../../../layouts/MainLayout"
import { trpc } from "../../../utils/trpc"
import CastVoteBtn from "./components/CastVoteBtn"
import { HandleCastVote } from "./types"

const VotingScreen: React.FC = () => {
    const router = useRouter()
    const { voteSetId } = router.query as { voteSetId: string }
    useEffect(() => {
        console.log(voteSetId)
    }, [voteSetId])

    const utils = trpc.useContext()

    const { data: votePair, isLoading: isPairLoading } = trpc.voteItem.getPair.useQuery({ voteSetId: voteSetId ?? '' })
    const { mutate: castVote, isLoading: isCasting } = trpc.vote.castProtected.useMutation({
        onSuccess: () => utils.voteItem.getPair.refetch({ voteSetId })
    })

    const handleCastVote: HandleCastVote = ({
        votedForId,
        votedAgainstId,
        voteSetId
    }) => {
        castVote({ votedForId, votedAgainstId, voteSetId })
    }

    return (
        <MainLayout useContainer={false}>
            {isPairLoading ? (
                <div>Loading...</div>
            ) : (votePair?.firstItem?.id && votePair?.secondItem?.id) ? (
                <div className='flex flex-row space-x-5 items-center'>
                    <CastVoteBtn 
                        handleCastVote={() => handleCastVote({ 
                            votedForId: votePair?.firstItem?.id as string, 
                            votedAgainstId: votePair?.secondItem?.id as string, 
                            voteSetId 
                        })}
                        isDisabled={isCasting}
                        item={votePair.firstItem}
                    />
                    <div>VS</div>
                    <CastVoteBtn 
                        handleCastVote={() => handleCastVote({ 
                            votedForId: votePair?.secondItem?.id as string, 
                            votedAgainstId: votePair?.firstItem?.id as string, 
                            voteSetId 
                        })}
                        isDisabled={isCasting}
                        item={votePair.secondItem}
                    />
                </div>
            ) : (
                <div>Error</div>
            )}
        </MainLayout>
    )
}

export default VotingScreen