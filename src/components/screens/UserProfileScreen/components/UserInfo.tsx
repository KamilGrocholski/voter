import Image from "next/image"

type UserInfoProps = {
    name: string
    role: string
    image: string
}

const UserInfo: React.FC<UserInfoProps> = (props) => {
    return (
        <div className='bg-dark-shade-7 p-3'>
            <Image
                src={props.image}
                alt={'Avatar'}
                layout='fixed'
                width={120}
                height={120}
            />
            <div>
                <span>{props.name}</span>
            </div>
        </div>
    )
}

export default UserInfo