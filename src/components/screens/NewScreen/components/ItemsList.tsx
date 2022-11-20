import { useNewVoteSetStore } from "../store"
import Item from "./Item"

const ItemsList: React.FC = () => {
    const items = useNewVoteSetStore(state => state.items)

    return (
        <div className='flex flex-col space-y-1'>
            {items.map((item, i) => (
                <Item 
                    key={ i }
                    name={ item.name }
                    image={ item.image }
                    index={ i }
                />
            ))}
        </div>
    )
}

export default ItemsList