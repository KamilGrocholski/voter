import { Modal, ModalActions } from "../../../common/Modal"
import { useNewVoteSetStore } from "../store"

const CreationStateModal = () => {
    const { setIsCreatorStateOpen, isError, isLoading, error } = useNewVoteSetStore()
    const isCreatorStateOpen = useNewVoteSetStore(state => state.isCreatorStateOpen)

    const handleCloseCreatorState = () => {
        setIsCreatorStateOpen(false)
    }

    const createDescription = () => {
        if (isLoading) return ''
        if (isError) return 'A problem has occured during the creation.'
        return 'A new set succesfully created.'
    }

    const createTitle = () => {
        if (isLoading) return 'Creating...'
        if (isError) return 'ERROR'
        return 'SUCCESS'
    }

    return (
        <Modal
            isOpen={isCreatorStateOpen}
            handleCancel={handleCloseCreatorState}
            title={createTitle()}
            description={createDescription()}
        >
            <div className='text-red-500'>
                {error}
            </div>
            <ModalActions>
                <button
                    className='border border-1 border-black rounded-md px-3 py-1 text-center bg-dark-accent-0/50'
                    onClick={handleCloseCreatorState}
                >
                    Close
                </button>
            </ModalActions>
        </Modal>
    )
}

export default CreationStateModal