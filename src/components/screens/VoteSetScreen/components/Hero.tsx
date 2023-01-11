import Image from "next/image"
import { parseDate } from '../../../../utils/parseDate'
import { VoteSet } from '../types'
import { sumSetVotes } from '../../../../utils/sumVotes'
import { useRouter } from 'next/router'
import UserInfoSmall from '../../../common/UserThings/UserInfoSmall'
import { RepIcons } from "../../../../assets/repIcons"

export type VoteSetHeroProps = VoteSet

const VoteSetHero: React.FC<VoteSetHeroProps> = (props) => {
    const router = useRouter()

    const handleGoToVoting = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        router.push(`/vote-sets/${props.id}/voting`)
    }

    return (
        <div className='w-full bg-dark-shade-800 mb-10'>
            <div className='relative rounded-md overflow-hidden w-full max-h-[300px] min-h-[300px]'>
                <div className='absolute top-0 left-0 bottom-0 right-0'>
                    <Image
                        src={props.image ?? 'd'}
                        alt='img'
                        layout="responsive"
                        width={550}
                        height={350}
                    />
                </div>
                {/* <Image
                    src={props.image ?? 'd'}
                    alt='xd'
                    layout='fill'
                    className='absolute top-0 left-0 right-0 blur-sm'
                /> */}
                <div className='absolute top-0 bottom-0 left-0 right-0 p-3 flex flex-col space-y-3 bg-black/50'>
                    <Info {...props} />
                    <button
                        onClick={handleGoToVoting}
                        className='bg-dark-shade-900/50 text-center w-fit px-2 h-10 rounded-sm transition-all duration-200 ease-in-out hover:bg-purple-800/50'
                    >
                        Go to voting page
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VoteSetHero

const Info: React.FC<VoteSetHeroProps> = (props) => {
    return (
        <div className='space-y-2 h-full'>
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
                created at {parseDate(createdAt)}
            </span>
            <span>
                last update {parseDate(updatedAt)}
            </span>
        </div>
    )
}

const ItemsVotesCounter: React.FC<Pick<VoteSetHeroProps, '_count' | 'voteItems'>> = ({
    _count,
    voteItems
}) => {
    return (
        <div className='text-lg font-semibold items-center'>
            <div className='flex flex-row space-x-1'>
                <span>{RepIcons.voteItem}</span>
                <span>{_count.voteItems}</span>
            </div>
            <div className='flex flex-row space-x-1'>
                <span>{RepIcons.vote}</span>
                <span>{sumSetVotes(voteItems)}</span>
            </div>
        </div>
    )
}

