import Link from 'next/link'

interface Link {
    label: string
    href: string
}

const LOGGED_OUT_LINKS: Link[] = [
    {
        label: 'Home',
        href: '/'
    },
    {
        label: 'My votes sets',
        href: '/my-votes-sets'
    }
]

const LoggedOutLinks: React.FC = () => {
    return (
        <div className='flex flex-row space-x-3 items-center text-md text-dark-shade-200'>
            {LOGGED_OUT_LINKS.map((link, i) => (
                <Link
                    key={link.href + i}
                    href={link.href}
                    aria-current={'page'}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    )
}

export default LoggedOutLinks
