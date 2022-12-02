import { User } from '@prisma/client' 
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { UserSmallInfoByIdPublic } from '../../../types/trpcOutputTypes'
import { trpc } from '../../../utils/trpc'
import { valuePairsToString } from '../../../utils/valuePairsToString'

interface Props {
    name: NonNullable<User['name']>
    role: User['role']
    image: User['image']
    id: User['id']
}

const ROLE_COLOR: Record<string, {
    text: string
    // bg: string
    outline: string
}> = {
    'base': {
        text: 'text-dark-accent-0',
        // bg: 'bg-green-50',
        outline: 'outline-purple-500'
    }
}

const UserInfoSmall: React.FC<Props> = ({
    name,
    role,
    image,
    id
}) => {
    const [isHovered, toggleIsHovered] = useState<boolean>(false) 

    const router = useRouter()
    const { data: moreInfo, isLoading } = trpc.user.getSmallInfoByIdPublic.useQuery({ id })

    const handleGoToUserProfile = () => {
        router.push(`/users/${ id }`)
    }

    const handleOnMouseLeave = () => {
        toggleIsHovered(false)
    }

    const handleOnMouseEnter = () => {
        toggleIsHovered(true)
    }

    return (
        <>
            {moreInfo && isHovered ?
            <MoreUserInfoPopup {...moreInfo} /> :
            null}

            <button
                id='user-small-info'
                onClick={ handleGoToUserProfile }
                onMouseEnter={ handleOnMouseEnter }
                onMouseLeave={ handleOnMouseLeave }
                className={ `relative flex flex-row space-x-1 hover:outline outline-1 items-center pl-1 pr-3 rounded-xl bg-dark-shade-10/75
                    ${ valuePairsToString(ROLE_COLOR[role] ?? {}) } }
                    ` }
            >
                <div className='h-[25px] w-[25px] overflow-hidden rounded-full'>
                    <Image 
                        src={ image ?? '/xs' }
                        alt='Avatar'
                        layout='responsive'
                        width={25}
                        height={25}
                    />
                </div>
                <div className='font-bold'>{ name }</div>
            </button>
        </>
    )
}

export default UserInfoSmall

const MoreUserInfoPopup: React.FC<UserSmallInfoByIdPublic> = (props) => {
    return (
        <div
            id='more-user-info-popup'
            className='absolute top-20 bg-dark-shade-9 rounded-md p-3 flex flex-row space-x-3'
        >
            <div className='flex flex-row space-x-3'>
                <div className='h-[50px] w-[50px] overflow-hidden rounded-full'>
                    <Image 
                        src={ props?.image ?? '/xs' }
                        alt='Avatar'
                        layout='responsive'
                        width={50}
                        height={50}
                    />
                </div>   
            </div>
            <div className='flex flex-col space-y-1'>
                <span className={ `font-semibold text-lg ${ valuePairsToString(ROLE_COLOR[props.role] ?? {})}` }>{props?.name}</span>
                {/* // TODO createdAt, name: string -- prisma */}
                <span className='text-xs text-white/50'>JOINED: <span>2022.22.10</span></span>
                <span className='text-xs text-white/50'>VOTE SETS: <span>{props?._count.voteSets}</span></span>
                <span className='text-xs text-white/50'>CASTED VOTES: <span>{props?._count.votes}</span></span>
            </div>
        </div>
    )
}