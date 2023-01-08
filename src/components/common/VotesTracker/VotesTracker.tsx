import Image from "next/image"
import { useState } from "react"
import { RepIcons } from "../../../assets/repIcons"
import { trpc } from "../../../utils/trpc"
import EmptyStateWrapper from "../EmptyStateWrapper"

interface VotesTrackerProps {
    voteSetId?: string
}

export const VotesTracker: React.FC<VotesTrackerProps> = ({
    voteSetId
}) => {
    const [show, setShow] = useState<boolean>(false)

    const myVotes = trpc.vote.getMyRecentVotes.useQuery({
        voteSetId
    })

    return (
        <div>
            <EmptyStateWrapper
                isLoading={myVotes.isLoading}
                isError={myVotes.isError}
                data={myVotes.data}
                NonEmptyComponent={(votes) =>
                    <div className={`z-50 bg-dark-shade-700 transition-all duration-400 ease-in-out fixed left-0 flex flex-row flex-row space-x-1 ${show ? "translate-x-0 " : "-translate-x-full"}`}>
                        <div
                            className={`h-[85vh] scroll-hidden scrollbar-hide overscroll-none overflow-y-scroll flex flex-col space-y-3`}
                        >
                            {votes.map((vote, i) => (
                                <VotePair
                                    key={i}
                                    forItem={{ ...vote.votedFor, isChosen: true }}
                                    againstItem={{ ...vote.votedAgainst, isChosen: false }}
                                />
                            ))}
                        </div>
                        <div className='w-6'>
                            <button
                                onClick={() => setShow(prev => !prev)}
                                className={`transition-all duration-400 ease-in-out w-full h-full bg-dark-shade-900 ${show ? 'translate-x-0' : 'translate-x-[100%]'}`}
                            >
                                <div className={`transition-all duration-400 ease-in-out h-content w-content ${show ? 'rotate-180' : 'rotate-0'}`}>
                                    {RepIcons.arrowRight}
                                </div>
                            </button>
                        </div>
                    </div>
                }
            />
        </div>
    )
}

interface VoteItemProps {
    name: string
    image: string
    id: string
    isChosen: boolean
}

const VotePair: React.FC<{
    forItem: VoteItemProps,
    againstItem: VoteItemProps
}> = ({
    forItem,
    againstItem
}) => {
        return (
            <div
                className='flex flex-row space-x-1'
            >
                <VoteItem {...forItem} />
                <VoteItem {...againstItem} />
            </div>
        )
    }

const VoteItem: React.FC<VoteItemProps> = ({
    name,
    image,
    id,
    isChosen
}) => {
    return (
        <div className={`flex flex-col border ${isChosen ? 'border-indicative-success' : 'border-indicative-danger'}`}>
            <Image
                src={image}
                alt='img'
                layout="fixed"
                width={60}
                height={30}
            />
        </div>
    )
}
