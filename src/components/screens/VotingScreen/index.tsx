import { Transition } from "@headlessui/react"
import { VoteSet } from "@prisma/client"
import { useRouter } from "next/router"
import { useState } from "react"
import MainLayout from "../../../layouts/MainLayout"
import { trpc } from "../../../utils/trpc"
import EmptyStateWrapper from "../../common/EmptyStateWrapper"
import { VotesTracker } from "../../common/VotesTracker"
import CastVoteBtn from "./components/CastVoteBtn"
import { ErrorModal } from "./components/ErrorModal"
import SkipBtn from "./components/SkipBtn"
import { Vs } from "./components/Vs"
import { HandleCastVote } from "./types"

const VotingScreen: React.FC = () => {
    const router = useRouter()
    const { voteSetId } = router.query as unknown as { voteSetId: VoteSet['id'] }
    const [canShowPair, setCanShowPair] = useState<boolean>(true)
    const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false)

    const utils = trpc.useContext()

    const votePairQuery = trpc.voteItem.getPair.useQuery(voteSetId ?? '', {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        onSuccess: () => {
            setCanShowPair(true)
        },
        onError: () => {
            setCanShowPair(false)
            setIsErrorModalOpen(true)
        }
    })
    const castVoteMutation = trpc.vote.castProtected.useMutation({
        onSuccess: () => {
            utils.voteItem.getPair.refetch(voteSetId)
            utils.vote.getMyRecentVotes.invalidate({ voteSetId })
        },
        onError: () => setIsErrorModalOpen(true)
    })

    const handleSkipVoting = async () => {
        setCanShowPair(false)
        // await new Promise(() => setTimeout(() => utils.voteItem.getPair.refetch(voteSetId ?? ''), 200))
        utils.voteItem.getPair.refetch(voteSetId ?? '')
    }

    const handleCastVote: HandleCastVote = ({
        votedForId,
        votedAgainstId,
        voteSetId
    }) => {
        setCanShowPair(false)
        castVoteMutation.mutate({ votedForId, votedAgainstId, voteSetId })
    }

    return (
        <MainLayout useContainer={false}>
            <ErrorModal
                onCancel={() => setIsErrorModalOpen(false)}
                isOpen={isErrorModalOpen}
                error={''}
            />
            <VotesTracker voteSetId={voteSetId} />
            <EmptyStateWrapper
                isError={votePairQuery.isError}
                isLoading={votePairQuery.isLoading}
                data={votePairQuery.data}
                ErrorComponent={
                    <span className='text-indicative-danger mx-auto items-center'>
                        An error has occured!
                        <button
                            onClick={() => votePairQuery.refetch()}
                            className='btn ml-3 text-indicative-success hover:border-indicative-error'
                        >
                            Try again
                        </button>
                    </span>
                }
                NonEmptyComponent={(votePair) => (
                    <Transition as='div' className='flex flex-col space-y-24 my-auto justify-center items-center' show={canShowPair}>
                        {/* <div className='flex flex-col space-y-24 my-auto justify-center items-center'> */}
                        <div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-24 items-center mx-auto justify-center w-full'>
                            <CastVoteBtn
                                handleCastVote={() => handleCastVote({
                                    votedForId: votePair?.firstItem?.id as VoteSet['id'],
                                    votedAgainstId: votePair?.secondItem?.id as VoteSet['id'],
                                    voteSetId
                                })}
                                isDisabled={castVoteMutation.isLoading}
                                item={votePair.firstItem as {
                                    image: string;
                                    id: string;
                                    name: string;
                                }}
                            />
                            <Vs />
                            <CastVoteBtn
                                handleCastVote={() => handleCastVote({
                                    votedForId: votePair?.secondItem?.id as VoteSet['id'],
                                    votedAgainstId: votePair?.firstItem?.id as VoteSet['id'],
                                    voteSetId
                                })}
                                isDisabled={castVoteMutation.isLoading}
                                item={votePair.secondItem as {
                                    image: string;
                                    id: string;
                                    name: string;
                                }}
                            />
                        </div>
                        <SkipBtn
                            isDisabled={votePairQuery.isLoading}
                            handleSkip={handleSkipVoting}
                        />
                        {/* </div> */}
                    </Transition>
                )}
            />
        </MainLayout>
    )
}

export default VotingScreen