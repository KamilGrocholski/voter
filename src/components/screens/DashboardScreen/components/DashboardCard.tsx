import Link from "next/link"
import Image from 'next/image'
import { AllVoteSetsByUserIdProtected } from '../../../../types/trpcOutputTypes'
import { sumSetVotes } from '../../../../utils/sumVotes'
import { parseDate } from '../../../../utils/parseDate'
import React, { useState } from 'react'
import SetDeletionModal from './SetDeletionModal'
import SetUpdateModal from './SetUpdateModal'
import { RepIcons } from '../../../../assets/repIcons'

const DashboardCard: React.FC<AllVoteSetsByUserIdProtected[number]> = (props) => {
    const [isOpenDeletion, setIsOpenDeletion] = useState<boolean>(false)
    const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false)

    const handleCloseDeletion = () => {
        setIsOpenDeletion(false)
    }

    const handleOpenDeletion = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setIsOpenDeletion(true)
    }

    const handleCloseUpdate = () => {
        setIsOpenUpdate(false)
    }

    const handleOpenUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setIsOpenUpdate(true)
    }

    return (
        <div>
            <Link
                href={ `/vote-sets/${props.id}` }
            >
                <div className='relative min-h-[280px] rounded-md overflow-hidden hover:cursor-pointer hover:outline outline-purple-800 shadow-lg shadow-black'>
                    <Image 
                        src={ props.image }
                        alt={ 'xd' }
                        layout='fill'
                        objectFit='cover'
                        objectPosition='center'
                        className='absolute top-0 bottom-0 left-0 right-0'
                    />
                    <div className='absolute top-0 bottom-0 left-0 right-0 p-3 bg-black/50'>
                        <div className='flex flex-row space-x-3 justify-end'>
                            <button className='text-yellow-500' onClick={ handleOpenUpdate }>{RepIcons.edit}</button>
                            <button className='text-red-500' onClick={ handleOpenDeletion }>{RepIcons.delete}</button>
                        </div>
                        <p>{ props.name }</p>
                        <div>
                            <div>Likes: { props._count.likes }</div>
                            <div>Dislikes: { props._count.dislikes }</div>
                            <div>Items: { props._count.voteItems }</div>
                            <div>Votes: { sumSetVotes(props.voteItems) }</div>
                            <div>Created at: { parseDate(props.createdAt) }</div>
                            <div>Updated at: { parseDate(props.updatedAt) }</div>
                        </div>
                        <div className={ `${ props.isPublished ? 'bg-green-900/20 border-green-900' : 'bg-red-900/20 border-red-900' } border px-2` }>
                            { props.isPublished ? 'Published' : 'Not published' }
                        </div>
                    </div>
                </div>
            </Link>
            <SetDeletionModal isOpen={ isOpenDeletion } voteSetId={ props.id } close={ handleCloseDeletion } />
            <SetUpdateModal isOpen={ isOpenUpdate } voteSet={ props } close={ handleCloseUpdate } />
        </div>
    )
}

export default DashboardCard