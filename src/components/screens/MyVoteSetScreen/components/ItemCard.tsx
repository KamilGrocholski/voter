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
                <div className='flex flex-row space-x-1 items-center'><span className='text-muted'>Name:</span><span>{props.name}</span></div>
                <div className='flex flex-row space-x-1 items-center'><span className='text-muted'>Created at:</span><span>{parseDate(props.createdAt)}</span></div>
                <div className='flex flex-row space-x-1 items-center'><span className='text-muted'>For/All:</span><span>{getVotesPercentage(props._count.votesFor, props._count.votesAgainst)}%</span></div>
                <div className='flex flex-row space-x-1 items-center'>
                    <span className='text-muted text-indicative-success'>For:</span><span>{props._count.votesFor}</span>
                    <span className='text-muted text-indicative-danger'>Against:</span><span>{props._count.votesAgainst}</span>
                </div>
            </div>

        </div>
    )
}

export default ItemCard