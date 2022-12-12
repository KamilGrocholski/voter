import { useState } from "react"
import { FormGroup } from "../../../common/Form"
import ImageUpload from "../../../common/ImageUpload/ImageUpload"
import { Modal, ModalForm, ModalActions } from "../../../common/Modal"
import { useNewVoteSetStore } from "../store"
import { PickVoteItem } from "../types"

const ItemCreationModal: React.FC = () => {
    const [newItem, setNewItem] = useState<Partial<PickVoteItem>>({})
    const isOpen = useNewVoteSetStore(state => state.isCreatorOpen)
    const { setIsCreatorOpen, addItem } = useNewVoteSetStore()

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
            addItem({ name: newItem.name, image: newItem.image })
            setNewItem({})
            setIsCreatorOpen(false)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            handleCancel={handleCancelCreation}
            title='Create a new item'
            description='Enter the name and the image'
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
                        className='bg-gray-900'
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
                    <button type='submit'>
                        Create
                    </button>
                    <button onClick={handleCancelCreation}>
                        Cancel
                    </button>
                </ModalActions>
            </ModalForm>
        </Modal>
    )
}

export default ItemCreationModal