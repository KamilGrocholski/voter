import { Menu } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { RepIcons } from '../../../../assets/repIcons'

const HamburgerMenu = () => {

    const { data } = useSession()

    return (
        <Menu as='div' className='relative inline-block text-left z-50'>
            <Menu.Button as='button' className='flex items-center'>
                {RepIcons.hamburger}
            </Menu.Button>

            <Menu.Items className='bg-dark-shade-900 absolute left-0 p-3 space-y-1 mt-2 w-56 origin-top-right divide-y divide-gray-500/50 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='flex flex-col space-y-1 text-md text-dark-shade-200'>
                    {data?.user?.id ?
                        <>
                            {LOGGED_IN_LINKS.map(link => (
                                <Menu.Item key={link.href} as='div' className={styles.normalItem}>
                                    <Link href={link.href}>
                                        {link.label}
                                    </Link>
                                </Menu.Item>
                            ))}
                        </> :
                        <>
                            {LOGGED_OUT_LINKS.map(link => (
                                <Menu.Item key={link.href} as='div' className={styles.normalItem}>
                                    <Link href={link.href}>
                                        {link.label}
                                    </Link>
                                </Menu.Item>
                            ))}
                        </>}
                </div>
            </Menu.Items>
        </Menu>
    )
}

export default HamburgerMenu

const styles = {
    normalItem: 'hover:bg-purple-500 px-3 rounded-md cursor-pointer w-full',
    logoutItem: 'hover:bg-red-500 text-white rounded-md px-3 cursor-pointer w-full'
}

const LOGGED_OUT_LINKS = [
    {
        label: 'Home',
        href: '/'
    },
]

const LOGGED_IN_LINKS = [
    {
        label: 'Home',
        href: '/'
    },
]
