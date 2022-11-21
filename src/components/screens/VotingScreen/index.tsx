import { VoteSet } from "@prisma/client"
import { useRouter } from "next/router"
import MainLayout from "../../../layouts/MainLayout"
import { trpc } from "../../../utils/trpc"
import CastVoteBtn from "./components/CastVoteBtn"
import { HandleCastVote } from "./types"

const VotingScreen: React.FC = () => {
    const router = useRouter()
    const { voteSetId } = router.query as unknown as { voteSetId: VoteSet['id'] }

    const utils = trpc.useContext()

    const { data: votePair, isLoading: isPairLoading } = trpc.voteItem.getPair.useQuery(voteSetId ?? '')
    const { mutate: castVote, isLoading: isCasting } = trpc.vote.castProtected.useMutation({
        onSuccess: () => utils.voteItem.getPair.refetch(voteSetId)
    })

    const handleSkipVoting = () => {
        utils.voteItem.getPair.refetch(voteSetId ?? '')
    }

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
                <div className='flex flex-col space-y-24 my-auto'>
                    <div className='flex flex-row space-x-24 items-center mx-auto'>
                        <CastVoteBtn 
                            handleCastVote={() => handleCastVote({ 
                                votedForId: votePair?.firstItem?.id as VoteSet['id'], 
                                votedAgainstId: votePair?.secondItem?.id as VoteSet['id'], 
                                voteSetId 
                            })}
                            isDisabled={isCasting}
                            item={votePair.firstItem}
                        />
                        <div>VS</div>
                        <CastVoteBtn 
                            handleCastVote={() => handleCastVote({ 
                                votedForId: votePair?.secondItem?.id as VoteSet['id'], 
                                votedAgainstId: votePair?.firstItem?.id as VoteSet['id'], 
                                voteSetId 
                            })}
                            isDisabled={isCasting}
                            item={votePair.secondItem}
                        />
                    </div>
                    <button onClick={ handleSkipVoting }>Skip</button>
                </div>
            ) : (
                <div>Error</div>
            )}
        </MainLayout>
    )
}

export default VotingScreen