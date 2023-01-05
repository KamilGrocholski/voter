import Image from "next/image"

type UserInfoProps = {
    image: string
    name: string
    voteSets: number
    votes: number
}

const UserInfo: React.FC<UserInfoProps> = (props) => {

    return (
        <div className='bg-dark-shade-900 p-3 flex flex-row space-x-3'>
            <Image
                src={props.image}
                alt={'Avatar'}
                layout='fixed'
                width={80}
                height={80}
            />
            <div className='flex flex-col space-y-3'>
                <div>
                    <span className='text-purple-800 text-xl font-semibold'>{props.name}</span>
                </div>
                <div className='flex flex-col text-gray-500'>
                    <span>Created vote sets: <span>{props.voteSets}</span></span>
                    <span>Casted votes: <span>{props.votes}</span></span>
                </div>
            </div>
        </div>
    )
}

export default UserInfo