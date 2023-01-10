import { Modal, ModalActions } from "../../../common/Modal"

interface Props {
    isOpen: boolean
    onClose: () => void
    canClose: boolean
    title: string
    description: string
}

export const SaveModal: React.FC<Props> = ({
    isOpen,
    onClose,
    canClose,
    description,
    title
}) => {
    return (
        <Modal
            title={title}
            description={description}
            isOpen={isOpen}
            handleCancel={onClose}
        >
            <ModalActions>
                <button disabled={!canClose} className="btn" onClick={onClose}>
                    Close
                </button>
            </ModalActions>
        </Modal>
    )
}
