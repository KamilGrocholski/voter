import { VoteItem } from "../types"

const Item: React.FC<VoteItem> = (props) => {
    return (
        <div>
            <div>{ props.name }</div>
            <div>{ props.image }</div>
            <div>Votes for: { props._count.votesFor}</div>
            <div>Votes against: { props._count.votesAgainst }</div>
        </div>
    )
}

export default Item