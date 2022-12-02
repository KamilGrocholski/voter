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
        <div className='flex flex-col bg-dark-shade-7 p-3'>
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
        </div>
    )
}

export default ItemsRanking