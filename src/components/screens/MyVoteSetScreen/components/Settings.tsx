import { Switch } from "@headlessui/react"
import { VoteSet } from "@prisma/client"
import Image from "next/image"
import { useState } from "react"
import { RepIcons } from "../../../../assets/repIcons"
import useCopyToClipboard from "../../../../hooks/use-clipboard"
import { trpc } from "../../../../utils/trpc"
import { FormGroup } from "../../../common/Form"
import ImageUpload from "../../../common/ImageUpload/ImageUpload"
import VoteSetDeletionModal from "./VoteSetDeletionModal"

interface SettingsProps {
    voteSetId: VoteSet['id']
    name: string
    image: string
    isPublished: boolean
}

export const Settings: React.FC<SettingsProps> = ({
    voteSetId,
    name,
    image,
    isPublished
}) => {
    const [, copy] = useCopyToClipboard()
    const [isOpenDeletion, setIsOpenDeletion] = useState<boolean>(false)
    const [isEditingName, setIsEditingName] = useState(false)
    const [newName, setNewName] = useState<string>(name)
    const [isEditingImage, setIsEditingImage] = useState(false)
    const [newImage, setNewImage] = useState<string>(image)
    const [isEditingPublished, setIsEditingPublished] = useState(false)
    const [newIsPublished, setNewIsPublished] = useState(isPublished)

    const utils = trpc.useContext()

    const updateVoteSet = trpc.voteSet.update.useMutation({
        onSuccess: () => {
            setIsEditingName(false)
            utils.voteSet.getMyVoteSetById.invalidate()
        }
    })

    const handleChangeImage = () => {
        updateVoteSet.mutate({
            image: newImage,
            voteSetId
        })
    }

    const handleCancelChangeImage = () => {
        setIsEditingImage(false)
        setNewImage(image)
    }

    const handleChangeName = () => {
        if (newName === name) {
            setIsEditingName(false)
            return
        }
        updateVoteSet.mutate({
            name: newName,
            voteSetId
        })
    }

    const handleCancelChangeName = () => {
        setIsEditingName(false)
        setNewName(name)
    }

    const handleCopyVoteSetId = () => {
        copy(voteSetId)
    }

    const handleCloseDeletion = () => {
        setIsOpenDeletion(false)
    }

    const handleOpenDeletion = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setIsOpenDeletion(true)
    }

    return (
        <div className='container mx-auto flex flex-col space-y-12'>
            <VoteSetDeletionModal isOpen={isOpenDeletion} voteSetId={voteSetId} close={handleCloseDeletion} />
            <div className='flex flex-col space-y-5'>
                <div>
                    {isEditingName ?
                        <div className='flex flex-row items-center space-x-3'>
                            <input
                                value={newName}
                                onChange={e => setNewName(e.target.value)}
                                className='input-normal'
                            />
                            <button className='btn-success' onClick={handleChangeName}>Save</button>
                            <button className='btn-danger' onClick={handleCancelChangeName}>Cancel</button>
                        </div> :
                        <div className='flex flex-row items-center space-x-3'>
                            <span className='text-lg'>{name}</span>
                            <button className='btn' onClick={() => setIsEditingName(true)}>{RepIcons.edit}</button>
                        </div>}
                </div>
                <div>
                    {isEditingImage ?
                        <div>
                            <ImageUpload storeImage={newImage} storeImageFn={setNewImage} />
                            <button className='btn-success' onClick={handleChangeImage}>Save</button>
                            <button className='btn-danger' onClick={handleCancelChangeImage}>Cancel</button>
                        </div> :
                        <div className='flex flex-row space-x-3'>
                            <div className='relative w-[300px] h-[200px]'>
                                <Image
                                    src={image}
                                    alt='img'
                                    layout='fill'
                                    objectFit='cover'
                                    objectPosition='center'
                                    className='absolute top-0 bottom-0 left-0 right-0'
                                />
                            </div>
                            <button className='btn h-min' onClick={() => setIsEditingImage(true)}>{RepIcons.edit}</button>
                        </div>}
                </div>
            </div>


            <div className='p-3 border-dark-shade-500 bg-dark-shade-800'>
                <div className='flex flex-col space-y-1'>
                    <div className='text-xl font-bold flex flex-row space-x-3 items-center'>
                        <div>{RepIcons.key}</div>
                        <div>Vote set ID</div>
                    </div>
                    <div className='bg-dark-shade-600 flex flex-row space-x-3 items-center p-2 rounded-md border-dark-shade-300'>
                        <span>{voteSetId}</span>
                        <button className='btn' onClick={handleCopyVoteSetId}>Copy ID</button>
                    </div>
                </div>
            </div>

            <div className='p-3 bg-dark-shade-800 flex flex-col space-y-1'>
                <span className='text-xl font-bold'>Delete the project</span>
                <span className='text-muted text-indicative-danger'>Deleting is permanent and can not be undone!</span>
                <button className='btn-danger w-full lg:max-w-[120px]' onClick={handleOpenDeletion}>DELETE</button>
            </div>
        </div>
    )
}
