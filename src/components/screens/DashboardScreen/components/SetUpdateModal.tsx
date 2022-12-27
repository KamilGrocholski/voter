import { Switch } from "@headlessui/react"
import React, { useState } from "react"
import { AllVoteSetsByUserIdProtected } from "../../../../types/trpcOutputTypes"
import { trpc } from "../../../../utils/trpc"
import { FormGroup } from "../../../common/Form"
import ImageUpload from "../../../common/ImageUpload/ImageUpload"
import { Modal, ModalActions } from "../../../common/Modal"
import ImageWidget from "./ImageWidget"

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
    const [updated, setUpdated] = useState<Pick<AllVoteSetsByUserIdProtected[number], 'name' | 'image' | 'isPublished'>>({ ...voteSet })

    const utils = trpc.useContext()

    const { mutate: updateSet } = trpc.voteSet.update.useMutation({
        onSuccess: () => {
            utils.voteSet.getAllByUserIdProtected.invalidate()
            close()
        }
    })

    const handleUpdateSet = (e: React.FormEvent) => {
        e.preventDefault()
        updateSet({ ...updated, voteSetId: voteSet.id })
    }

    const handleIsPublished = () => {
        setUpdated(prev => ({ ...prev, isPublished: !prev.isPublished }))
    }

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdated(prev => ({ ...prev, name: e.target.value }))
    }

    const handleImage = (url: string) => {
        setUpdated(prev => ({ ...prev, image: url }))
    }

    const handleClose = () => {
        setUpdated({ ...voteSet })
        close()
    }

    return (
        <Modal
            handleCancel={handleClose}
            isOpen={isOpen}
            title='Update the vote set'
            description=''
        >
            <form onSubmit={handleUpdateSet} className='flex flex-col space-y-3'>
                <FormGroup
                    label='Name'
                    name='vote-set-name'
                >
                    <>
                        <span className='text-indicative-danger'>{!updated.name || updated.name && (updated.name.length <= 5 || updated.name.length >= 45) ? 'Name must be between 5 and 45 characters' : null}</span>
                        <input
                            id='vote-set-name'
                            value={updated.name}
                            onChange={handleName}
                            className='input-normal'
                        />
                    </>
                </FormGroup>
                <FormGroup
                    label='Image'
                    name='vote-set-image'
                >
                    <>
                        <span className='text-indicative-danger'>{updated.image ? null : 'Choose an image'}</span>
                        <ImageUpload
                            storeImage={updated.image}
                            storeImageFn={handleImage}
                        />
                    </>
                </FormGroup>
                <FormGroup
                    label='Published'
                    name='vote-set-published'
                    error={voteSet._count.voteItems < 2 ? 'Must have at least 2 items to bo published' : undefined}
                >
                    <Switch
                        checked={updated.isPublished}
                        onChange={handleIsPublished}
                        className={`${updated.isPublished ? 'bg-green-500' : 'bg-red-500'
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                        disabled={voteSet._count.voteItems < 2}
                    >
                        <span className="sr-only">Enable notifications</span>
                        <span
                            className={`${updated.isPublished ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                    </Switch>
                </FormGroup>

                <ImageWidget />

                <ModalActions>
                    <button type='submit' className='btn'>Confirm</button>
                    <button onClick={handleClose} className='btn'>Cancel</button>
                </ModalActions>
            </form>
        </Modal>
    )
}

export default SetUpdateModal