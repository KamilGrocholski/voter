import { Modal, ModalActions } from "../../../common/Modal"
import { useNewVoteSetStore } from "../store"

const CreationStateModal = () => {
    const { isCreatorStateOpen, setIsCreatorStateOpen } = useNewVoteSetStore()

    const handleCloseCreatorState = () => {
        setIsCreatorStateOpen(false)
    }

    return (
        <Modal
            isOpen={isCreatorStateOpen}
            handleCancel={handleCloseCreatorState}
            title='Create a new item'
            description='Try again'
        >
            <div>
                xd
            </div>
            <ModalActions>
                <button onClick={handleCloseCreatorState}>
                    Close
                </button>
            </ModalActions>
        </Modal>
    )
}

export default CreationStateModal