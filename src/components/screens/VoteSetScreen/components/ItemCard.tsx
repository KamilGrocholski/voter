import { VoteSetByIdPublic } from '../../../../types/trpcOutputTypes'
import Image from 'next/image'
import { getVotesPercentage } from '../../../../utils/getVotesPercentage'
import { parseDate } from '../../../../utils/parseDate'

type ItemCardProps = VoteSetByIdPublic['voteItems'][number] & { position: number }

const ItemCard: React.FC<ItemCardProps> = (props) => {
    return (
        <tr className='odd:bg-dark-shade-900 [&>td]:px-1 [&>td]:lg:px-4'>
            <td>
                {props.position}
            </td>
            <td>
                <Image
                    src={props.image}
                    alt='img'
                    layout='fixed'
                    width={100}
                    height={50}
                />
            </td>
            <td>
                {props.name}
            </td>
            <td>
                <PercentageFill
                    percentage={getVotesPercentage(props._count.votesFor, props._count.votesAgainst)}
                    votesFor={props._count.votesFor}
                    votesAgainst={props._count.votesAgainst}
                />
            </td>
            <td className='lg:table-cell hidden'>
                {parseDate(props.createdAt)}
            </td>
        </tr>
    )
}

export default ItemCard

const PercentageFill: React.FC<{
    percentage: number
    votesFor: number
    votesAgainst: number
}> = ({
    percentage,
    votesFor,
    votesAgainst
}) => {
        return (
            <div className='flex flex-col'>
                <span className='text-white text-sm flex flex-row justify-between'>
                    <span>{percentage}%</span>
                    <div className='flex flex-row space-x-1'>
                        <span className='text-indicative-success'>{votesFor}</span>
                        <span className='text-muted'>|</span>
                        <span className='text-indicative-danger'>{votesAgainst}</span>
                    </div>
                </span>
                <div className='bg-dark-shade-500 w-24 h-3'>
                    <div className='bg-indicative-success h-full' style={{ width: percentage }}></div>
                </div>
            </div>
        )
    }