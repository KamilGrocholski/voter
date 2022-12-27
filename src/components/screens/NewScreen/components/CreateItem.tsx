import { useNewVoteSetStore } from "../store"

const CreateItem: React.FC = () => {
    const { setIsCreatorOpen } = useNewVoteSetStore()

    const handleOpenCreator = () => {
        setIsCreatorOpen(true)
    }

    return (
        <button
            onClick={handleOpenCreator}
            className='btn-normal btn mx-auto'
        >
            Create a new item
        </button>
    )
}

export default CreateItem