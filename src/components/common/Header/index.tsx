import { useSession } from 'next-auth/react'
import AccountMenu from './components/AccountMenu'
import LoggedInLinks from './components/LoggedInLinks'
import LoggedOutLinks from './components/LoggedOutLinks'

const Header = () => {
    const { data, status } = useSession()
    const isLoggedIn = !!data?.user // !! dwie negacje konwertują `truthy` i `falsy` na boolean
    const userData = data?.user

    return (
        <header className='h-[72px] px-2 z-50'>
            <nav className='flex justify-between mx-auto items-center w-full'>
                {data?.user ? (
                    <LoggedInLinks role={ data.user.role } />
                ) : (
                    <LoggedOutLinks />
                )}
                <AccountMenu />
            </nav>
        </header>
    )
}

export default Header