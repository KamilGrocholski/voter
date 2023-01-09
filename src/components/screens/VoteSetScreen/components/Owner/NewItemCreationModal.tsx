import { VoteSet } from "@prisma/client"
import { useState } from "react"
import { trpc } from "../../../../../utils/trpc"
import { FormGroup } from "../../../../common/Form"
import ImageUpload from "../../../../common/ImageUpload/ImageUpload"
import { Modal, ModalActions, ModalForm } from "../../../../common/Modal"
import { PickVoteItem } from "../../../NewScreen/types"

const ItemCreationModal: React.FC<{ voteSetId: VoteSet['id'], isCreatorOpen: boolean, setIsCreatorOpen: (bool: boolean) => void }> = ({
    voteSetId,
    isCreatorOpen,
    setIsCreatorOpen
}) => {
    const [newItem, setNewItem] = useState<Partial<PickVoteItem>>({})

    const utils = trpc.useContext()

    const { mutate: createItem } = trpc.voteItem.create.useMutation({
        onSuccess: () => {
            utils.voteSet.getOneById.invalidate()
        }
    })

    const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItem(prev => ({ ...prev, name: e.target.value }))
    }

    const handleSetImage = (url: string) => {
        setNewItem(prev => ({ ...prev, image: url }))
    }

    const handleCancelCreation = () => {
        setIsCreatorOpen(false)
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (newItem.image && newItem.name) {
            createItem({ name: newItem.name, image: newItem.image, voteSetId })
            setNewItem({})
            setIsCreatorOpen(false)
        }
    }

    return (
        <Modal
            isOpen={isCreatorOpen}
            handleCancel={handleCancelCreation}
            title='Create a new item'
            description='Enter a name and an image'
        >
            <ModalForm onSubmit={onSubmit}>
                <FormGroup
                    label='Name'
                    name='newItemName'
                >
                    <input
                        type='text'
                        value={newItem?.name}
                        onChange={handleSetName}
                        className='input-normal'
                    />
                </FormGroup>
                <FormGroup
                    label='Image'
                    name='newItemImage'
                >
                    <ImageUpload
                        storeImage={newItem.image}
                        storeImageFn={handleSetImage}
                    />
                </FormGroup>
                <ModalActions>
                    <button type='submit' className='btn'>
                        Create
                    </button>
                    <button onClick={handleCancelCreation} className='btn'>
                        Cancel
                    </button>
                </ModalActions>
            </ModalForm>
        </Modal>
    )
}

export default ItemCreationModal