import React from "react"
import { useNewVoteSetStore } from "../store"

const ImagePreview = () => {
    const image = useNewVoteSetStore(state => state.image)
    const { setImage } = useNewVoteSetStore()

    const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.value)
    }

    return (
        <div className='rouded-md bg-gray-700 px-3 py-1'>
            <input 
                placeholder='Choose an image for your new vote set'
                value={ image }
                onChange={ handleSetImage }
                className='bg-inherit w-full'
            />
        </div>
    )
}

export default ImagePreview