import { useSession } from 'next-auth/react'
import AccountMenu from './components/AccountMenu'
import LoggedInLinks from './components/LoggedInLinks'
import LoggedOutLinks from './components/LoggedOutLinks'
import Logo from './components/Logo'

const Header = () => {
    const { data, status } = useSession()
    const isLoggedIn = !!data?.user // !! dwie negacje konwertują `truthy` i `falsy` na boolean
    const userData = data?.user

    return (
        <header className='h-16 w-full px-3 z-50 border-b border-dark-border items-center flex'>
            <Logo />
            <nav className='flex flex-row space-x-8 items-center'>
                {data?.user ? (
                    <LoggedInLinks role={ data.user.role } />
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