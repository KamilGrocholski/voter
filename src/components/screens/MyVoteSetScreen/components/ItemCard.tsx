import { VoteSetByIdPublic } from '../../../../types/trpcOutputTypes'
import Image from 'next/image'
import { getVotesPercentage } from '../../../../utils/getVotesPercentage'
import { parseDate } from '../../../../utils/parseDate'

type ItemCardProps = VoteSetByIdPublic['voteItems'][number] & { position: number }

const ItemCard: React.FC<ItemCardProps> = (props) => {
    return (
        <div className='flex md:flex-row flex-col space-x-3 items-start p-2 odd:bg-dark-shade-800'>

            <div className='flex flex-row space-x-3 items-center py-1 justify-start'>
                <div>#{props.position}</div>
                <div className='flex'>
                    <Image
                        src={props.image}
                        alt={'xd'}
                        layout='fixed'
                        width={80}
                        height={40}
                    />
                </div>
            </div>

            <div className='flex flex-col space-y-1 items-start'>
                <div><span>Name: <span>{props.name}</span></span></div>
                <div><span>Created: <span>{parseDate(props.createdAt)}</span></span></div>
                <div><span>For/Against: <span>{getVotesPercentage(props._count.votesFor, props._count.votesAgainst)}%</span></span></div>
                <div className='text-indicative-success'><span>Votes for: <span>{props._count.votesFor}</span></span></div>
                <div className='text-indicative-danger'><span>Votes against: <span>{props._count.votesAgainst}</span></span></div>
            </div>

        </div>
    )
}

export default ItemCard