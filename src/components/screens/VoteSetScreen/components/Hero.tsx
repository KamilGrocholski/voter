import placeholder from '../../../../assets/placeholders/dashboard-card-placeholder.jpg'
import Image from "next/image"
import { parseDate } from '../../../../utils/parseDate'
import { VoteSet } from '../types'
import { sumSetVotes } from '../../../../utils/sumVotes'
import { useRouter } from 'next/router'
import UserInfoSmall from '../../../common/UserThings/UserInfoSmall'

export type VoteSetHeroProps = VoteSet

const VoteSetHero: React.FC<VoteSetHeroProps> = (props) => {
    const router = useRouter()

    const handleGoToVoting = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        router.push(`/vote-sets/${ props.id }/voting`)
    }

    return (
        <div>
            <div className='relative rounded-md overflow-hidden w-full max-h-[300px] bg-black/20'>
                <Image 
                    src={placeholder}
                    alt='xd'
                    layout='responsive'
                    className='absolute top-0 left-0 right-0 blur-sm'
                />
                <div className='absolute top-0 bottom-0 left-0 right-0 p-3 flex flex-col space-y-3'>
                    <Info {...props} />
                </div>
            </div>
        </div>
    )
}

export default VoteSetHero

const Info: React.FC<VoteSetHeroProps> = (props) => {
    return (
        <div className='bg-black/50'>
            <Name {...props} />
            <Owner {...props} />
            <ItemsVotesCounter {...props} />
            <Timestamps {...props} />
        </div>
    )
}

const Owner: React.FC<Pick<VoteSetHeroProps, 'owner'>> = ({
    owner
}) => {
    return (
        <div className='flex flex-row space-x-3'>
            <span className='text-xs text-white/50'>by</span>
            <UserInfoSmall 
                id={owner.id}
                name={owner.name ?? ''}
                image={owner.image ?? ''}
                role={owner.role}
            />
        </div>
    )
}

const Name: React.FC<Pick<VoteSetHeroProps, 'name'>> = ({
    name
}) => {
    return (
        <div className='font-bold text-3xl'>
            {name}
        </div>
    )
}

const Timestamps: React.FC<Pick<VoteSetHeroProps, 'createdAt' | 'updatedAt'>> = ({
    createdAt,
    updatedAt
}) => {
    return (
        <div className='flex flex-col space-y-1 text-xs text-white/50'>
            <span>
                created on {parseDate(createdAt)}
            </span>
            <span>
                updated on {parseDate(updatedAt)}
            </span>
        </div>
    )
}

const ItemsVotesCounter: React.FC<Pick<VoteSetHeroProps, '_count' | 'voteItems'>> = ({
    _count,
    voteItems
}) => {
    return (
        <div>
           <div>Items: {_count.voteItems}</div> 
           <div>Votes: {sumSetVotes(voteItems)}</div> 
        </div>
    )
}

