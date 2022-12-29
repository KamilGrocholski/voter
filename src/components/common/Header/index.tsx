import { useSession } from 'next-auth/react'
import useWindowSize from '../../../hooks/use-window-size'
import AccountMenu from './components/AccountMenu'
import HamburgerMenu from './components/HamburgerMenu'
import LoggedInLinks from './components/LoggedInLinks'
import LoggedOutLinks from './components/LoggedOutLinks'
import Logo from './components/Logo'

const Header = () => {
    const { data, status } = useSession()
    const isLoggedIn = !!data?.user // !! dwie negacje konwertują `truthy` i `falsy` na boolean
    const userData = data?.user

    const { width } = useWindowSize()

    if (width <= 785) return (
        <header className='w-full h-11 py-2 px-3 z-50 items-center flex bg-dark-shade-900'>
            <nav className='flex flex-row space-x-8 items-center justify-between w-full'>
                <HamburgerMenu />
                <Logo />
                {/* <hr className='text-white w-2'/> */}
                <AccountMenu />
            </nav>
        </header>
    )

    return (
        <header className='w-full h-11 py-2 px-3 z-50 items-center flex bg-dark-shade-900'>
            <Logo />
            <nav className='flex flex-row space-x-8 items-center'>
                {data?.user ? (
                    <LoggedInLinks role={data.user.role} />
                ) : (
                    <LoggedOutLinks />
                )}
                {/* <hr className='text-white w-2'/> */}
                <AccountMenu />
            </nav>
        </header>
    )
}

export default Header