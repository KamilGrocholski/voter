import { Menu } from "@headlessui/react"
import { BY, TIME } from "../../constants/filter-vote-sets"
import { useVoteSetsFilter } from "../../hooks/use-vote-sets-filter"

type VoteSetsFilterProps = ReturnType<typeof useVoteSetsFilter>

export const VoteSetsFilter: React.FC<VoteSetsFilterProps> = ({
    ...fields
}) => {

    return (
        <div className='flex flex-row space-x-3 container mx-auto mb-6'>
            <Menu as='div' className='relative'>
                <div className='flex flex-col space-y-1'>
                    <label className='text-muted'>Posted</label>
                    <Menu.Button className='btn'>{TIME[fields.time]}</Menu.Button>
                </div>
                <Menu.Items className='z-50 bg-dark-shade-900 flex flex-col absolute left-0 p-3 space-y-1 mt-2 w-56 divide-y origin-top-right divide-gray-500/50 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    {Object.entries(TIME).map(([key, value]) => (
                        <Menu.Item key={key} as='div' className='dropdown-item'>
                            <button
                                onClick={() => fields.setTime(key as keyof typeof TIME)}
                                className='hover:bg-purple-500 px-3 rounded-md cursor-pointer w-full text-start'
                            >
                                {value}
                            </button>
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Menu>

            <Menu as='div' className='relative'>
                <div className='flex flex-col space-y-1'>
                    <label className='text-muted'>Order by</label>
                    <Menu.Button className='btn'>{BY[fields.by]}</Menu.Button>
                </div>
                <Menu.Items className='z-50 bg-dark-shade-900 flex flex-col absolute left-0 p-3 space-y-1 mt-2 w-56 divide-y origin-top-right divide-gray-500/50 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    {Object.entries(BY).map(([key, value]) => (
                        <Menu.Item key={key} as='div' className='dropdown-item'>
                            <button
                                onClick={() => fields.setBy(key as keyof typeof BY)}
                                className='hover:bg-purple-500 px-3 rounded-md cursor-pointer w-full text-start'
                            >
                                {value}
                            </button>
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Menu>
        </div>
    )
}
