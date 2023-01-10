import { RepIcons } from "../../../assets/repIcons"
import { VoteSetByIdPublic } from "../../../types/trpcOutputTypes"

const LikeDislikeButtons: React.FC<Pick<VoteSetByIdPublic, '_count'> & { handleLike: () => void, handleDislike: () => void }> = ({
    _count,
    handleLike,
    handleDislike
}) => {
    return (
        <div className='grid grid-col-2 gap-3'>
            <Button
                type='Like'
                counter={_count.likes}
                handler={handleLike}
            />
            <Button
                type='Dislike'
                counter={_count.dislikes}
                handler={handleDislike}
            />
        </div>
    )
}

export default LikeDislikeButtons


const Button: React.FC<{
    counter: number
    type: 'Like' | 'Dislike'
    handler: () => void
}> = ({
    // counter,
    type,
    handler
}) => {
        return (
            <div>
                <button
                    onClick={handler}
                >
                    {type === 'Like'
                        ? RepIcons.like
                        : RepIcons.dislike}
                </button>
            </div>
        )
    }