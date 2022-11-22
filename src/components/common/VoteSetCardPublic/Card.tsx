import Link from 'next/link'
import React from 'react'
import placeholder from '../../../assets/placeholders/dashboard-card-placeholder.jpg'
import Image from 'next/image'
import { VotesSetsPagination } from '../../../types/trpcOutputTypes'
import { parseDate } from '../../../utils/parseDate'
import { sumSetVotes } from '../../../utils/sumVotes'
import { useRouter } from 'next/router'
import { RepIcons } from '../../../assets/placeholders/repIcons'
import { trpc } from '../../../utils/trpc'
import { VoteSet } from '@prisma/client'

const VoteSetCard: React.FC<VotesSetsPagination[number]> = (props) => {

    return (
        <div>
            <Link
                href={ `/vote-sets/${props.id}/voting` }
            >
                <div className='relative h-min-[180px] h-full rounded-md overflow-hidden hover:cursor-pointer hover:outline outline-purple-800 shadow-lg shadow-black'>
                    <Image 
                        src={ placeholder }
                        alt={ 'xd' }
                        className='absolute top-0 bottom-0 left-0 right-0'
                        layout='responsive'
                    />
                    <div className='absolute top-0 bottom-0 left-0 right-0 p-3'>
                        <div className='h-[85%] flex flex-col space-y-1'>
                            <Name 
                                name={props.name}
                            />
                            <Owner
                                id={props.owner.id}
                                name={props.owner.name}
                                image={props.owner.image}
                            />
                            <Items 
                                quantity={props._count.voteItems}
                            />
                            <Votes 
                                votes={props.voteItems}
                            />
                        </div>
                        <div className='h-[15%] flex justify-between items-end'>
                            <Timestamps 
                                createdAt={props.createdAt}
                                updatedAt={props.updatedAt}
                            />
                            <LikesDislikes 
                                likes={props._count.likes}
                                dislikes={props._count.dislikes}
                                voteSetId={props.id}
                            />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default VoteSetCard

const Name: React.FC<{ name: VotesSetsPagination[number]['name'] }> = ({
    name
}) => {
    return (
        <div className='text-2xl font-semibold'>
            { name }
        </div>
    )
}

const Items: React.FC<{
    quantity: number
}> = ({
    quantity
}) => {
    return (
        <div className='flex flex-row space-x-2'>
            <div>{RepIcons.voteItem}</div>
            <div>{ quantity }</div>
        </div> 
    )
}

const Timestamps: React.FC<{
    createdAt: VotesSetsPagination[number]['createdAt'],
    updatedAt: VotesSetsPagination[number]['updatedAt']
}> = ({
    createdAt,
    updatedAt
}) => {
    return (
        <div className='flex flex-col space-y-1 text-xs'>
            <div className='flex flex-row space-x-1'>
                <div>created at </div>
                <div>{ parseDate(createdAt) }</div>
            </div>
            <div className='flex flex-row space-x-1'>
                <div>last update </div>
                <div>{ parseDate(updatedAt) }</div>
            </div>
        </div>
    )
}

const LikesDislikes: React.FC<{
    likes: number
    dislikes: number,
    voteSetId: VoteSet['id']
}> = ({
    likes,
    dislikes,
    voteSetId
}) => {
    const utils = trpc.useContext()

    const { mutate: likeDislike, isLoading } = trpc.voteSet.likeDislike.useMutation({
        onSuccess: () => utils.voteSet.pagination.invalidate()
    })

    const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        likeDislike({ action: 'like', voteSetId })
    }

    const handleDislike = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        likeDislike({ action: 'dislike', voteSetId })
    }

    return (
        <div className='flex flex-row space-x-3'>
            <button 
                onClick={handleLike}
                disabled={isLoading}
                className='flex flex-row space-x-1'
            >
                <div className='text-green-500'>{RepIcons.like}</div>
                <div>{likes}</div>
            </button>
            <button 
                onClick={handleDislike}
                disabled={isLoading}
                className='flex flex-row space-x-1'
            >
                <div className='text-red-500'>{RepIcons.dislike}</div>
                <div>{dislikes}</div>
            </button>
        </div>
    )
}

const Votes: React.FC<{
    votes: VotesSetsPagination[number]['voteItems']
}> = ({
    votes
}) => {
    return (
        <div className='flex flex-row space-x-3'>
            <div>{RepIcons.vote}</div>
            <div>{ sumSetVotes(votes) }</div>
        </div>
    )
}

const Owner: React.FC<VotesSetsPagination[number]['owner']> = ({
    id,
    image,
    name
}) => {
    const router = useRouter()

    const handleGoToUserProfile = () => {
        router.push(`/users/${ id }`)
    }

    return (
        <div className='flex flex-row space-x-3 items-center text-xs'>
            <div>owned by </div>
            <button
                onClick={ handleGoToUserProfile }
                className='flex flex-row space-x-1 hover:outline outline-purple-500 items-center pl-1 pr-3'
            >
                <div className='h-[25px] w-[25px] overflow-hidden rounded-full'>
                    <Image 
                        src={ placeholder }
                        alt='Avatar'
                        layout='responsive'
                        width={25}
                        height={25}
                    />
                </div>
                <div>{ name }</div>
            </button>
        </div>
    )
}