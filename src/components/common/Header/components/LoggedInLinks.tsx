import Link from 'next/link'

interface Props {
    role: Role
}

export enum Role {
    BASE = 'base',
    ADMIN = 'admin'
}

interface Link {
    label: string
    href: string
}

type RoleBasedLinks = Record<Role, Link[]>

const COMMON_LOGGED_IN_LINKS: Link[] = [
]

const ROLE_BASED_LINKS: RoleBasedLinks = {
    base: [
        ...COMMON_LOGGED_IN_LINKS,
        {
            label: 'Dashboard',
            href: '/dashboard'
        }
    ],
    admin: [
        ...COMMON_LOGGED_IN_LINKS,
        {
            label: 'Link1',
            href: '/'
        }
    ]
}

const LoggedInLinks: React.FC<Props> = ({

}) => {
    return (
        <div className='flex flex-row space-x-3 items-center text-md text-dark-shade-200'>
            {ROLE_BASED_LINKS.base.map((link) => (
                <div
                    key={link.href}
                    className='hover:text-white'
                >
                    <Link
                        href={link.href}
                        aria-current={'page'}
                    >
                        {link.label}
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default LoggedInLinks
