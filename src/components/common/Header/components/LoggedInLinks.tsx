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
    {
        label: 'Home',
        href: '/'
    },
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
    role
}) => {
    return (
        <>
            {ROLE_BASED_LINKS.base.map((link, i) => (
                <Link 
                    key={ link.href + i }
                    href={ link.href }
                    aria-current={ 'page' }
                >
                    { link.label }
                </Link>
            ))}
        </>
    )
}

export default LoggedInLinks
