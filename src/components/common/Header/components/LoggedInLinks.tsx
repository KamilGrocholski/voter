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
        label: 'Vote sets',
        href: '/vote-sets'
    }
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
                <div
                    key={ link.href + i }
                    className='hover:text-white text-muted-light'
                >
                    <Link 
                        href={ link.href }
                        aria-current={ 'page' }
                        >
                        { link.label }
                    </Link>
                </div>
            ))}
        </>
    )
}

export default LoggedInLinks
