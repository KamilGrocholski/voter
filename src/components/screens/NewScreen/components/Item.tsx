import React, { useState } from "react"
import { useNewVoteSetStore } from "../store"
import { NewVoteItem } from "../types"
import Image from "next/image"
import ImageUpload from "../../../common/ImageUpload/ImageUpload"

const Item: React.FC<NewVoteItem> = ({ name, image, index }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [newName, setNewName] = useState<string>(name)
    const [newImage, setNewImage] = useState<string>(image)
    const removeItem = useNewVoteSetStore(state => state.removeItem)
    const editItem = useNewVoteSetStore(state => state.editItem)

    const handleRemoveItem = () => {
        removeItem(index)
    }
    const handleEditItem = () => {
        editItem(index, { name: newName, image: newImage })
        setIsEditing(false)
    }

    const handleCancelEditing = () => {
        setIsEditing(false)
    }

    const handleStartEditing = () => {
        setIsEditing(true)
    }

    const handleSetNewName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }

    const handleSetNewImage = (url: string) => {
        setNewImage(url)
    }

    return (
        <div className='flex flex-col space-y-3 brd brd-normal p-3'>
            <div className='flex flex-row space-x-3'>
                {isEditing ?
                    (
                        <div className='flex flex-col space-y-3'>
                            <input
                                type='text'
                                value={newName}
                                onChange={handleSetNewName}
                                className='input-normal'
                            />
                            <ImageUpload
                                storeImage={newImage}
                                storeImageFn={handleSetNewImage}
                            />
                            <div className='flex flex-row justify-end space-x-3'>
                                <button onClick={handleEditItem} className='btn btn-normal'>Save</button>
                                <button onClick={handleCancelEditing} className='btn btn-normal'>Cancel</button>
                            </div>
                        </div>
                    ) :
                    (<>
                        <div className='flex flex-col space-y-3 w-full'>
                            <div className='flex flex-row space-x-3'>
                                <Image
                                    src={newImage}
                                    alt='image'
                                    layout="fixed"
                                    width={100}
                                    height={80}
                                />
                                <div>{newName}</div>
                            </div>
                            <div className="flex flex-row justify-end space-x-3">
                                <button
                                    onClick={handleStartEditing}
                                    className='btn btn-normal'
                                >
                                    Edit
                                </button>
                                <button onClick={handleRemoveItem} className='btn btn-normal'>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </>)}
            </div>
        </div>
    )
}

export default Item