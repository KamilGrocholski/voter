import placeholder from '../../../../assets/placeholders/dashboard-card-placeholder.jpg'
import Image from "next/image"
import { parseDate } from '../../../../utils/parseDate'
import { VoteSet } from '../types'
import { sumSetVotes } from '../../../../utils/sumVotes'

type VoteSetHero = VoteSet

const VoteSetHero: React.FC<VoteSetHero> = (props) => {
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
                    <div>{ props.name }</div>
                    <div>Created at: { parseDate(props.createdAt) }</div>
                    <div>Updated at: { parseDate(props.updatedAt) }</div>
                    <div>Items: { props._count.voteItems }</div>
                    <div>Votes: { sumSetVotes(props.voteItems) }</div>
                    <div>Likes: { props._count.likes }</div>
                    <div>Dislikes: { props._count.dislikes }</div>
                </div>
            </div>
        </div>
    )
}

export default VoteSetHero