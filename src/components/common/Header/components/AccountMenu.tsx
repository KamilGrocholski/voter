import { signOut, signIn, useSession } from 'next-auth/react'
import Link from 'next/link'

const AccountMenu = () => {
    const { data, status } = useSession()
    const handleSignOut = () => {
        signOut()
    }

    const handleSignIn = () => {
        signIn('discord')
    }

    if (!data?.user) return (
        <div>
            <button onClick={ handleSignIn }>
                Sign in
            </button>
        </div>
    )

    return (
        <div>
            <Link href='/profile'>
                Profile
            </Link> 
            <button onClick={ handleSignOut }>
                Sign out
            </button>
        </div>
    )
}

export default AccountMenu