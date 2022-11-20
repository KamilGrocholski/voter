import Link from "next/link"

const DashboardHeader: React.FC = () => {
    return (
        <div className='flex flex-row items-center justify-between mb-5 w-full'>
            <div className='flex grow'>
                Your vote sets
            </div>
            <div>
                <Link
                    href={ '/new' }
                >
                    <div className='flex flex-row px-3 py-1 items-center space-x-3 justify-between hover:cursor-pointer border border-gray-500 rounded'>
                        <div className='text-purple-500'>+</div>
                        <div>New set</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default DashboardHeader