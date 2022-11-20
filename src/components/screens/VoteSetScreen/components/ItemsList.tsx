import { VoteItemsList } from "../types"
import Item from "./Item"

interface Props {
    voteItemsList: VoteItemsList
}

const ItemsList: React.FC<Props> = ({ voteItemsList }) => {
    return (
        <div className='flex flex-col space-y-3'>
            {voteItemsList.map((item, i) => (
                <Item key={ i } { ...item } />
            ))}
        </div>
    )
}

export default ItemsList