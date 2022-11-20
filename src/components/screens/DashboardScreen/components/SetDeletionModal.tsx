import { VoteSet } from '@prisma/client'
import React from 'react'
import { trpc } from '../../../../utils/trpc'
import { Modal, ModalActions } from '../../../common/Modal'

interface Props {
    isOpen: boolean
    close: () => void,
    voteSetId: VoteSet['id']
}

const SetDeletionModal: React.FC<Props> = ({
    isOpen,
    close,
    voteSetId
}) => {
    const utils = trpc.useContext()
    const { mutate: deleteSet } = trpc.voteSet.delete.useMutation({
        onSuccess: () => {
            utils.voteSet.getAllByUserIdProtected.invalidate()
            close()
        }
    })

    const handleDeleteSet = () => {
        deleteSet({ voteSetId })
    }

    return (
        <Modal
            isOpen={ isOpen }
            handleCancel={ close }
            title='Delete the vote set'
            description='Are you sure?'
        >
            <ModalActions>
                <button onClick={ handleDeleteSet }>
                    Confirm
                </button>
                <button onClick={ close }>
                    Cancel
                </button>
            </ModalActions>
        </Modal>
    )
}

export default SetDeletionModal