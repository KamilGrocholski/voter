import { VoteItem } from "../types"
import Image from 'next/image'

interface CastVoteBtnProps {
    isDisabled: boolean,
    handleCastVote: () => void 
    item: NonNullable<VoteItem>
}

const CastVoteBtn: React.FC<CastVoteBtnProps> = ({
    isDisabled,
    handleCastVote,
    item
}) => {

    return (
        <div>
            <button
                onClick={handleCastVote}
                disabled={isDisabled}
                className='flex flex-col rounded-md justify-center items-center hover:cursor-pointer hover:outline outline-purple-800 shadow-lg shadow-black overflow-hidden'
            >
                <div className='relative w-[25vw] h-[20vh]'>
                    <Image 
                        src={item.image}
                        alt={'xd'}
                        layout='fill'
                    />
                </div>
                <div className='bg-dark-shade-10 w-full flex items-center justify-center h-12 font-semibold text-xl rounded-md'>
                    {item.name}
                </div>
            </button>
        </div>
    )
}

export default CastVoteBtn