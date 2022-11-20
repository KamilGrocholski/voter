import React, { useState } from "react"
import { useNewVoteSetStore } from "../store"
import { NewVoteItem } from "../types"

const Item: React.FC<NewVoteItem> = ({ name, image, index }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [newName, setNewName] = useState<string>(name)
    const [newImage, setNewImage] = useState<string>(image)
    const { removeItem, editItem } = useNewVoteSetStore()

    const handleRemoveItem = () => {
        removeItem(index)
    }
    const handleEditItem = () => {
        editItem(index, { name: newName, image: newImage })
        setIsEditing(false)
    } 

    const handleCancelEditing = () => {
        setNewName(name)
        setNewImage(image)
        setIsEditing(false)
    }

    const handleStartEditing = () => {
        setIsEditing(true)
    }

    const handleSetNewName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }

    const handleSetNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewImage(e.currentTarget.value)
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 rounded-md border p-1'>
            <div className='flex flex-row space-x-3'>
                {isEditing ?
                (
                <>
                <input 
                    type='text'
                    value={ newName }
                    onChange={ handleSetNewName }    
                    className='bg-gray-700'
                />
                <input 
                    type='text'
                    value={ newImage }
                    onChange={ handleSetNewImage }    
                    className='bg-gray-700'
                />
                <button onClick={ handleEditItem }>Save</button>
                <button onClick={ handleCancelEditing }>Cancel</button>
                </>
                ) :
                (<>
                <div>{ newName }</div>
                <div>{ newImage }</div>
                <button 
                    onClick={ handleStartEditing }
                >
                    Edit
                </button>
                </>)}
            </div>
            <button onClick={ handleRemoveItem }>
                Remove
            </button>
        </div>
    )
}

export default Item