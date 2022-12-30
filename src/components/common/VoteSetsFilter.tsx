import { Menu } from "@headlessui/react"
import { Fragment } from "react"
import { BY, TIME } from "../../constants/filter-vote-sets"
import { useVoteSetsFilter } from "../../hooks/use-vote-sets-filter"

type VoteSetsFilterProps = ReturnType<typeof useVoteSetsFilter>

export const VoteSetsFilter: React.FC<VoteSetsFilterProps> = ({
    ...fields
}) => {

    return (
        <div>
            <Menu>
                <Menu.Button>{TIME[fields.time]}</Menu.Button>
                <Menu.Items>
                    {Object.entries(TIME).map(([key, value]) => (
                        <Menu.Item key={key} as={Fragment}>
                            {({ active }) => (
                                <button
                                    onClick={() => fields.setTime(key as keyof typeof TIME)}
                                    className={`${active ? 'bg-sky-500' : 'bg-gray-600'}`}
                                >
                                    {value}
                                </button>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Menu>

            <Menu>
                <Menu.Button>{BY[fields.by]}</Menu.Button>
                <Menu.Items>
                    {Object.entries(BY).map(([key, value]) => (
                        <Menu.Item key={key} as={Fragment}>
                            {({ active }) => (
                                <button
                                    onClick={() => fields.setBy(key as keyof typeof BY)}
                                    className={`${active ? 'bg-sky-500' : 'bg-gray-600'}`}
                                >
                                    {value}
                                </button>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Menu>
        </div>
    )
}
