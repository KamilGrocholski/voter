import { VoteSetByIdPublic } from "../../../../types/trpcOutputTypes"
import { sortByTopVotesForPercentage } from "../../../../utils/sortVoteItems"
import ItemCard from "./ItemCard"

interface ItemsRankingProps {
    items: VoteSetByIdPublic['voteItems']
}

const ItemsRanking: React.FC<ItemsRankingProps> = ({
    items
}) => {
    return (
        <div className='flex flex-col bg-dark-shade-7 bg-dark-shade-800 p-1 lg:p-3 mx-auto rounded-md'>
            <table className='table-auto'>
                <thead>
                    <tr className='bg-dark-shade-800 [&>th]:px-1 [&>th]:lg:px-4'>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Votes</th>
                        <th className='lg:table-cell hidden'>Created at</th>
                    </tr>
                </thead>
                <tbody>
                    {sortByTopVotesForPercentage(items).map((item, i) => (
                        <ItemCard
                            key={i}
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            _count={item._count}
                            createdAt={item.createdAt}
                            updatedAt={item.updatedAt}
                            position={i + 1}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ItemsRanking