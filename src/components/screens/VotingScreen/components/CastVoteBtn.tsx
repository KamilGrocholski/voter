import { VoteItem } from "../types"
import Image from 'next/image'
import { Transition } from "@headlessui/react"

interface CastVoteBtnProps {
    isDisabled: boolean,
    handleCastVote: () => void
    item: NonNullable<VoteItem>
}

const CastVoteBtn: React.FC<CastVoteBtnProps> = ({
    isDisabled,
    handleCastVote,
    item,
}) => {

    return (
        <Transition.Child
            enter="transform transition duration-400"
            enterFrom="opacity-0 rotate-[-120deg] scale-50"
            enterTo="opacity-100 rotate-0 scale-100"
            leave="transform duration-400 transition ease-in-out"
            leaveFrom="opacity-100 rotate-0 scale-100 "
            leaveTo="opacity-0 scale-50"
        >
            <button
                onClick={handleCastVote}
                disabled={isDisabled}
                className='bg-dark-shade-900 flex flex-col rounded-md justify-center items-center hover:cursor-pointer hover:outline outline-purple-800 shadow-lg shadow-black overflow-hidden'
            >
                <div className='relative w-[25vw] h-[20vh]'>
                    <Image
                        src={item.image}
                        alt={'xd'}
                        layout='fill'
                    />
                </div>
                <div className=' w-full flex items-center justify-center h-12 font-semibold text-xl rounded-md'>
                    {item.name}
                </div>
            </button>
        </Transition.Child>
    )
}

export default CastVoteBtn