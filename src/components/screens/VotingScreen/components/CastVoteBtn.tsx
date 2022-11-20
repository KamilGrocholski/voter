import placeholder from '../../../../assets/placeholders/dashboard-card-placeholder.jpg'
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
                onClick={ handleCastVote }
                disabled={ isDisabled }
                className='relative h-[20vh] w-[15vw]'
            >
                <div className='flex flex-col space-y-3 items-center'>
                    <Image 
                        src={ placeholder }
                        alt='xd'
                        layout='fixed'
                        width={300}
                        height={300}
                    />
                    <div className='flex items-center'>
                        { item.name }
                    </div>
                </div>
            </button>
        </div>
    )
}

export default CastVoteBtn