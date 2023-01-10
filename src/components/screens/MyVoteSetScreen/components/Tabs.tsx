import { Tab } from "@headlessui/react"
import Link from "next/link"
import { MyVoteSetByIdProtected } from "../../../../types/trpcOutputTypes"
import { Items } from "./Items"
import { Overview } from "./Overview"
import { Settings } from "./Settings"

export const Tabs: React.FC<MyVoteSetByIdProtected> = (voteSet) => {
    const TABS = [
        'Overview',
        'Items',
        'Settings'
    ] as const

    return (
        <Tab.Group>
            <Tab.List className='w-full bg-dark-shade-800 h-min flex items-end pt-10 pb-1'>
                <div className='flex flex-col space-y-12 container mx-auto px-3 lg:px-0'>
                    <div className='flex flex-col space-y-1'>
                        <div className='flex flex-row space-x-2 items-center'>
                            <div className='text-2xl font-bold'>{voteSet.name}</div>
                            <div className={`text-sm h-min font-bold px-2 rounded-md w-fit ${voteSet.isPublished ? 'text-indicative-success bg-indicative-success/10' : 'text-indicative-danger bg-indicative-danger/10'} `}>{voteSet.isPublished ? 'PUBLISHED' : 'NOT PUBLISHED'}</div>
                        </div>
                        <div className='text-sm font-semibold text-muted flex flex-row space-x-3 items-center'>
                            <Link href={`/vote-sets/${voteSet.id}/voting`}><span className='link'>Voting page</span></Link>
                            <div>|</div>
                            <Link href={`/vote-sets/${voteSet.id}`}><span className='link'>Vote set page</span></Link>
                        </div>
                    </div>
                    <div className='flex flex-row space-x-3'>
                        {TABS.map((tab, index) => (
                            <Tab key={index}>
                                {({ selected }) => (
                                    <button className={`btn ${selected && 'bg-dark-shade-100'}`}>
                                        {tab}
                                    </button>
                                )}
                            </Tab>
                        ))}
                    </div>
                </div>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel><Overview {...voteSet} /></Tab.Panel>
                <Tab.Panel><Items items={voteSet.voteItems} voteSetId={voteSet.id} /></Tab.Panel>
                <Tab.Panel>
                    <Settings
                        voteSetId={voteSet.id}
                        name={voteSet.name}
                        image={voteSet.image}
                        isPublished={voteSet.isPublished}
                        voteItems={voteSet._count.voteItems}
                    />
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    )
}
