import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { VotesSetsPagination } from '../../../types/trpcOutputTypes'
import { parseDate } from '../../../utils/parseDate'
import { sumSetVotes } from '../../../utils/sumVotes'
import { RepIcons } from '../../../assets/repIcons'
import { trpc } from '../../../utils/trpc'
import { VoteSet } from '@prisma/client'
import UserInfoSmall from '../UserThings/UserInfoSmall'
import { useRouter } from 'next/router'

const VoteSetCard: React.FC<VotesSetsPagination['voteSets'][number]> = (props) => {

    return (
        <div className='group'>
            <Link
                href={`/vote-sets/${props.id}/voting`}
            >
                <div className='relative min-h-[280px] rounded-md overflow-hidden transition-all ease-in-out duration-200 group-hover:cursor-pointer group-hover:outline outline-purple-800 shadow-lg shadow-black max-w-screen'>
                    <Image
                        src={props.image}
                        alt={'xd'}
                        layout='fill'
                        objectFit='cover'
                        objectPosition='center'
                        className='absolute top-0 bottom-0 left-0 right-0 transition-all ease-in-out duration-200 group-hover:scale-110'
                    />
                    <div className='absolute top-0 bottom-0 left-0 right-0 p-3 bg-dark-shade-800/70'>
                        <div className='h-[85%] flex flex-col'>
                            <div className='flex flex-row justify-between'>
                                <Name
                                    name={props.name}
                                />
                                <GoToVoteSetPage
                                    voteSetId={props.id}
                                />
                            </div>
                            <Owner
                                id={props.owner.id}
                                name={props.owner.name}
                                image={props.owner.image}
                                role={props.owner.role}
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

const GoToVoteSetPage: React.FC<{ voteSetId: VoteSet['id'] }> = ({ voteSetId }) => {
    const router = useRouter()

    const handleGoToVoteSetPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        router.push(`/vote-sets/${voteSetId}`)
    }

    return (
        <button
            onClick={handleGoToVoteSetPage}
            className='bg-dark-shade-900/50 text-center w-16 h-10 rounded-sm transition-all duration-200 ease-in-out hover:bg-purple-800/50'
        >
            View
        </button>
    )
}

const Name: React.FC<{ name: VotesSetsPagination['voteSets'][number]['name'] }> = ({
    name
}) => {
    return (
        <div className='text-2xl font-semibold mb-1 break-all'>
            {name}
        </div>
    )
}

const Items: React.FC<{
    quantity: number
}> = ({
    quantity
}) => {
        return (
            <div className='flex flex-row space-x-3'>
                <div>{RepIcons.voteItem}</div>
                <div>{quantity}</div>
            </div>
        )
    }

const Timestamps: React.FC<{
    createdAt: VotesSetsPagination['voteSets'][number]['createdAt'],
    updatedAt: VotesSetsPagination['voteSets'][number]['updatedAt']
}> = ({
    createdAt,
    updatedAt
}) => {
        return (
            <div className='flex flex-col space-y-1 text-xs'>
                <div className='flex flex-row space-x-1'>
                    <div>created at </div>
                    <div>{parseDate(createdAt)}</div>
                </div>
                <div className='flex flex-row space-x-1'>
                    <div>last update </div>
                    <div>{parseDate(updatedAt)}</div>
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
            onSuccess: () => utils.voteSet.getVoteSets.invalidate()
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
                    <div className='text-indicative-success'>{RepIcons.like}</div>
                    <div>{likes}</div>
                </button>
                <button
                    onClick={handleDislike}
                    disabled={isLoading}
                    className='flex flex-row space-x-1'
                >
                    <div className='text-indicative-danger'>{RepIcons.dislike}</div>
                    <div>{dislikes}</div>
                </button>
            </div>
        )
    }

const Votes: React.FC<{
    votes: VotesSetsPagination['voteSets'][number]['voteItems']
}> = ({
    votes
}) => {
        return (
            <div className='flex flex-row space-x-3'>
                <div>{RepIcons.vote}</div>
                <div>{sumSetVotes(votes)}</div>
            </div>
        )
    }

const Owner: React.FC<VotesSetsPagination['voteSets'][number]['owner']> = ({
    id,
    image,
    name,
    role
}) => {
    return (
        <div className='flex flex-row space-x-3 items-center text-xs'>
            <div>by</div>
            <UserInfoSmall
                id={id}
                image={image}
                name={name as string}
                role={role}
            />
        </div>
    )
}