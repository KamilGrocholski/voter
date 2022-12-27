import { Menu } from '@headlessui/react'
import { signOut, signIn, useSession } from 'next-auth/react'
import Image from 'next/image'

const AccountMenu = () => {

    const { data } = useSession()

    const handleSignIn = () => {
        signIn('discord')
    }

    const handleSignOut = () => {
        signOut()
    }

    if (!data?.user) return (
        <div>
            <button onClick={handleSignIn}>
                Sign in
            </button>
        </div>
    )

    return (
        <Menu as='div' className='relative inline-block text-left z-50'>
            <div>
                <Menu.Button>
                    <div className='rounded-full overflow-hidden w-[50px] h-[50px]'>
                        <Image
                            src={data.user.image ?? ''}
                            alt='xd'
                            layout='fixed'
                            width={50}
                            height={50}
                            objectFit='cover'
                            objectPosition='center'
                        />
                    </div>
                </Menu.Button>
            </div>

            <Menu.Items className='absolute right-0 p-3 space-y-1 mt-2 w-56 origin-top-right divide-y divide-gray-500/50 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='flex flex-col space-y-1'>
                    <Menu.Item>
                        <span className={styles.normalItem}>Your profile</span>
                    </Menu.Item>
                    <Menu.Item>
                        <span className={styles.normalItem}>Settings</span>
                    </Menu.Item>
                </div>
                <div className='flex flex-col pt-1'>
                    <Menu.Item>
                        <span onClick={handleSignOut} className={styles.logoutItem}>Logout</span>
                    </Menu.Item>
                </div>
            </Menu.Items>
        </Menu>
    )
}

export default AccountMenu

const styles = {
    normalItem: 'hover:bg-purple-500 px-3 rounded-md cursor-pointer w-full',
    logoutItem: 'hover:bg-red-500 text-white rounded-md px-3 cursor-pointer w-full'
}