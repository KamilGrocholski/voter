import { VoteSet } from "@prisma/client"
import Image from "next/image"
import { useState } from "react"
import { RepIcons } from "../../../../assets/repIcons"
import useCopyToClipboard from "../../../../hooks/use-clipboard"
import { trpc } from "../../../../utils/trpc"
import ImageUpload from "../../../common/ImageUpload/ImageUpload"
import { SaveModal } from "./SaveModal"
import VoteSetDeletionModal from "./VoteSetDeletionModal"

interface SettingsProps {
    voteSetId: VoteSet['id']
    name: string
    image: string
    isPublished: boolean
    voteItems: number
}

export const Settings: React.FC<SettingsProps> = ({
    voteSetId,
    name,
    image,
    isPublished,
    voteItems
}) => {
    const [copied, copy] = useCopyToClipboard()
    const [isOpenDeletion, setIsOpenDeletion] = useState<boolean>(false)
    const [isEditingName, setIsEditingName] = useState(false)
    const [newName, setNewName] = useState<string>(name)
    const [isEditingImage, setIsEditingImage] = useState(false)
    const [newImage, setNewImage] = useState<string>(image)

    const [showSaveModal, setShowSaveModal] = useState(false)
    const [canCloseSaveModal, setCanCloseSaveModal] = useState(true)

    const utils = trpc.useContext()

    const updateVoteSet = trpc.voteSet.update.useMutation({
        onSuccess: () => {
            setIsEditingName(false)
            setIsEditingImage(false)
            utils.voteSet.getMyVoteSetById.invalidate()
        },
        onSettled: () => {
            setCanCloseSaveModal(true)
        }
    })

    const handleToggleVoteSetState = () => {
        setCanCloseSaveModal(false)
        setShowSaveModal(true)
        updateVoteSet.mutate({
            voteSetId,
            isPublished: !isPublished
        })
    }

    const handleChangeImage = () => {
        setCanCloseSaveModal(false)
        setShowSaveModal(true)
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
        setCanCloseSaveModal(false)
        setShowSaveModal(true)
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
        <div className='container mx-auto flex flex-col space-y-12 px-3 lg:px-0 mb-12'>
            {/* Modal open on save  */}
            <SaveModal
                isOpen={showSaveModal}
                onClose={() => setShowSaveModal(false)}
                canClose={canCloseSaveModal}
                title={updateVoteSet.isLoading ? 'Updating your vote set...' : updateVoteSet.isError ? 'Error' : 'Success'}
                description={updateVoteSet.isLoading ? 'Wait' : updateVoteSet.isError ? 'Error' : 'You can now close the window'}
            />
            <VoteSetDeletionModal isOpen={isOpenDeletion} voteSetId={voteSetId} close={handleCloseDeletion} />
            <div className='flex flex-col space-y-5 p-3 border-dark-shade-500 bg-dark-shade-800'>
                {/* Vote state editing */}
                <div className='bg-dark-shade-600 p-3 flex flex-col'>
                    <span className='text-xl font-semibold mb-1'>Vote set state</span>
                    <span className='text-indicative-danger'>{voteItems < 2 ? 'Must have at least 2 items to make it public' : null}</span>
                    <button
                        className={`w-min ${isPublished ? 'btn-danger' : 'btn-success'}`}
                        onClick={handleToggleVoteSetState}
                        disabled={voteItems < 2}
                    >
                        {isPublished ? 'Make it private' : 'Make it public'}
                    </button>
                </div>

                {/* Vote name editing  */}
                <div className='bg-dark-shade-600 p-3'>
                    <span className='text-xl font-semibold mb-1'>Vote set name</span>
                    {isEditingName ?
                        <div className='flex flex-col space-y-3'>
                            <div className='flex flex-col space-y-2'>
                                <span className='text-indicative-danger'>{!newName || newName && (newName.length <= 5 || newName.length >= 45) ? 'Name must be between 5 and 45 characters' : null}</span>
                                <input
                                    value={newName}
                                    onChange={e => setNewName(e.target.value)}
                                    className='input-normal w-min'
                                />
                            </div>
                            <div className='flex flex-row items-center space-x-3'>
                                <button className='btn-success' onClick={handleChangeName}>Save</button>
                                <button className='btn-danger' onClick={handleCancelChangeName}>Cancel</button>
                            </div>
                        </div> :
                        <div className='flex flex-row items-center space-x-3'>
                            <span className='text-lg'>{name}</span>
                            <button className='btn' onClick={() => setIsEditingName(true)}>{RepIcons.edit}</button>
                        </div>}
                </div>

                {/* Vote image editing */}
                <div className='bg-dark-shade-600 p-3'>
                    <span className='text-xl font-semibold mb-2'>Vote set image</span>
                    {isEditingImage ?
                        <div className='flex flex-col space-y-2'>
                            <ImageUpload storeImage={newImage} storeImageFn={setNewImage} />
                            <div className='flex flex-row items-center space-x-3'>
                                <button className='btn-success' onClick={handleChangeImage}>Save</button>
                                <button className='btn-danger' onClick={handleCancelChangeImage}>Cancel</button>
                            </div>
                        </div> :
                        <div className='flex flex-col space-y-3'>
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
                            <button className='btn w-min' onClick={() => setIsEditingImage(true)}>{RepIcons.edit}</button>
                        </div>}
                </div>
            </div>


            <div className='p-3 border-dark-shade-500 bg-dark-shade-800'>
                {/* Vote set ID copy  */}
                <div className='flex flex-col space-y-1'>
                    <div className='text-xl font-bold flex flex-row space-x-3 items-center'>
                        <div>{RepIcons.key}</div>
                        <div>Vote set ID</div>
                    </div>
                    <div className='bg-dark-shade-600 flex flex-row space-x-3 items-center p-2 rounded-md border-dark-shade-300'>
                        <span>{voteSetId}</span>
                        <button
                            className='btn'
                            onClick={handleCopyVoteSetId}
                        >
                            {copied === voteSetId ? 'Copied!' : 'Copy ID'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Vote set deletion  */}
            <div className='p-3 bg-dark-shade-800 flex flex-col space-y-1'>
                <div className='text-xl font-bold flex flex-row space-x-3 items-center'>
                    <div className='text-indicative-danger'>{RepIcons.bin}</div>
                    <div>Delete the vote set</div>
                </div>
                <span className='text-muted text-indicative-danger'>Deleting is permanent and can not be undone!</span>
                <button
                    className='btn-danger w-full lg:max-w-[120px]'
                    onClick={handleOpenDeletion}
                >
                    DELETE
                </button>
            </div>
        </div>
    )
}
