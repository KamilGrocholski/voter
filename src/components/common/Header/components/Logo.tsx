import Link from "next/link"

const Logo: React.FC = () => {
    return (
        <div className='flex grow hover:cursor-pointer'>
            <Link
                href="/"
            >
            <p className='text-3xl font-bold text-center'>Voter</p>
        </Link>
        </div>
    )
}

export default Logo