import Image from 'next/image'
import React, { useRef } from 'react'
import { convertFileToBase64 } from '../../../utils/fileConverting'

interface ImageUploadProps {
    storeImageFn: (url: string) => void
    storeImage: string | undefined
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    storeImageFn,
    storeImage
}) => {
    const inputFileRef = useRef<HTMLInputElement | null>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const handleSetFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const filesList = e.currentTarget.files
        const file = filesList && filesList.length >= 1 ? filesList[0] : undefined
        if (!file) return
        storeImageFn(await convertFileToBase64(file))
    }

    const handleChooseFile = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!inputFileRef.current) {
            console.error("Couldn't invoke `handleChooseFile`")
            throw new Error()
        }
        inputFileRef.current.click()
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                className='hidden-input'
                ref={inputFileRef}
                type='file'
                onChange={handleSetFile}
                accept="image/*"
            />
            {storeImage ?
                (<Image
                    src={storeImage}
                    alt='image'
                    layout='fixed'
                    width={300}
                    height={200}
                />) : null}
            <button
                onClick={handleChooseFile}
                className='px-2 py-1 border border-1 border-black'
            >
                Choose a file
            </button>
        </form>
    )
}

export default ImageUpload