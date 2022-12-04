import { VoteSetByIdPublic } from '../../../../types/trpcOutputTypes'
import Image from 'next/image'
import { getVotesPercentage } from '../../../../utils/getVotesPercentage'

type ItemCardProps = VoteSetByIdPublic['voteItems'][number] & { position: number } 

const ItemCard: React.FC<ItemCardProps> = (props) => {
    return (
        <div className='flex md:flex-row flex-col space-x-3 items-center odd:bg-dark-shade-8 p-2'>

            <div className='flex flex-row space-x-3 items-center'>
                <div>#{props.position}</div>
                <div className='relative w-[80px] h-[40px]'>
                    <Image 
                        src={props.image}
                        alt={'xd'}
                        layout='fill'
                        objectFit='cover'
                        objectPosition='center'
                        className='absolute top-0 bottom-0 left-0 right-0'
                    />
                </div>
                <div>{props.name}</div>
            </div>

            <div className='flex flex-row space-x-3 items-center'>
                <div>{getVotesPercentage(props._count.votesFor, props._count.votesAgainst)}%</div>
                <div className='text-indicative-success'>{props._count.votesFor}</div>
                <div className='text-indicative-danger'>{props._count.votesAgainst}</div>
            </div>

        </div>
    )
}

export default ItemCard