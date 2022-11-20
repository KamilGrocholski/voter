import React, { useState } from "react"
import { AllVoteSetsByUserIdProtected } from "../../../../types/trpcOutputTypes"
import { trpc } from "../../../../utils/trpc"
import { Modal, ModalActions } from "../../../common/Modal"

interface Props {
    isOpen: boolean
    close: () => void
    voteSet: AllVoteSetsByUserIdProtected[number]
}

const SetUpdateModal: React.FC<Props> = ({
    isOpen,
    close,
    voteSet
}) => {
    const [updated, setUpdated] = useState<Pick<AllVoteSetsByUserIdProtected[number], 'name' | 'image' | 'isPublished'>>({...voteSet})

    const utils = trpc.useContext()

    const { mutate: updateSet } = trpc.voteSet.update.useMutation({
        onSuccess: () => {
            utils.voteSet.getAllByUserIdProtected.invalidate()
            close()
        }
    })

    const handleUpdateSet = () => {
        updateSet({ ...updated, voteSetId: voteSet.id })
    }

    const handleIsPublished = () => {
        setUpdated(prev => ({ ...prev, isPublished: !prev.isPublished }))
    }

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdated(prev => ({ ...prev, name: e.target.value }))
    }

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdated(prev => ({ ...prev, image: e.target.value }))
    }

    return (
        <Modal
            handleCancel={close}
            isOpen={isOpen}
            title='Update the vote set'
            description=''
        >
            <div className='flex flex-col space-y-3'>
                <div>Name: { updated.name }</div>
                <div>Image: { updated.image }</div>
                <div>
                    <div>Is published: { updated.isPublished ? 'YES' : 'NO'}</div>
                    <button onClick={ handleIsPublished }>Toggle publish</button>
                </div>
            </div>

            <ModalActions>
                <button onClick={ handleUpdateSet }>Confirm</button>
                <button onClick={ close }>Cancel</button>
            </ModalActions>
        </Modal>
    )
}

export default SetUpdateModal