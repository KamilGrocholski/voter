import { User } from '@prisma/client' 
import Image from 'next/image'
import { useRouter } from 'next/router'
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
        text: 'text-purple-500',
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
    const router = useRouter()

    const handleGoToUserProfile = () => {
        router.push(`/users/${ id }`)
    }

    return (
        <button
            onClick={ handleGoToUserProfile }
            className={ `flex flex-row space-x-1 hover:outline outline-1 items-center pl-1 pr-3 rounded-xl bg-black/50
                ${ valuePairsToString(ROLE_COLOR[role] ?? {}) } }` }
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
    )
}

export default UserInfoSmall