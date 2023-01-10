import { VoteSet } from "@prisma/client"
import Link from "next/link"
import Image from "next/image"

export const DashboardVoteSetCard: React.FC<Pick<VoteSet, 'name' | 'image' | 'isPublished' | 'id'>> = ({
    name,
    image,
    isPublished,
    id
}) => {
    return (
        <div>
            <Link
                href={`/my-vote-set/${id}`}
            >
                <div className='relative min-h-[140px] rounded-md overflow-hidden hover:cursor-pointer hover:outline outline-purple-800 shadow-lg shadow-black'>
                    <Image
                        src={image}
                        alt={'xd'}
                        layout='fill'
                        objectFit='cover'
                        objectPosition='center'
                        className='absolute top-0 bottom-0 left-0 right-0'
                    />
                    <div className='absolute top-0 bottom-0 left-0 right-0 p-3 bg-black/50'>
                        <p>{name}</p>
                        <div className={`${isPublished ? 'bg-indicative-success/20 border-indicative-success' : 'bg-indicative-danger/20 border-indicative-danger'} border px-2`}>
                            {isPublished ? 'Published' : 'Not published'}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
