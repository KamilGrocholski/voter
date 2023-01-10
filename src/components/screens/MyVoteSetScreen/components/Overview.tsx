import { RepIcons } from "../../../../assets/repIcons"
import { MyVoteSetByIdProtected } from "../../../../types/trpcOutputTypes"
import { parseDate } from "../../../../utils/parseDate"
import { sumSetVotes } from "../../../../utils/sumVotes"

export const Overview: React.FC<MyVoteSetByIdProtected> = (voteSet) => {
    return (
        <div className='container mx-auto mt-12 px-3 lg:px-0 mb-12'>
            <Section title='Summary'>
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-3'>
                    <InfoBox
                        label='Created at'
                        icon={RepIcons.calendar}
                        value={parseDate(voteSet.createdAt) ?? ''}
                    />
                    <InfoBox
                        label='Updated at'
                        icon={RepIcons.calendar}
                        value={parseDate(voteSet.updatedAt) ?? ''}
                    />
                    <InfoBox
                        label='Total items'
                        icon={RepIcons.voteItem}
                        value={voteSet._count.voteItems}
                    />
                    <InfoBox
                        label='Total votes'
                        icon={RepIcons.vote}
                        value={sumSetVotes(voteSet.voteItems)}
                    />
                    <InfoBox
                        label='Likes'
                        icon={RepIcons.like}
                        value={voteSet._count.likes}
                    />
                    <InfoBox
                        label='Dislikes'
                        icon={RepIcons.dislike}
                        value={voteSet._count.dislikes}
                    />
                </div>
            </Section>
        </div>
    )
}

interface SectionProps {
    title: string
    children: JSX.Element | JSX.Element[]
}

const Section: React.FC<SectionProps> = ({
    title,
    children
}) => {
    return (
        <section className='border border-dark-shade-400 p-2 flex flex-col space-y-3'>
            <span className='font-semibold text-lg text-muted'>{title}</span>
            <div>
                {children}
            </div>
        </section>
    )
}

interface InfoBoxProps {
    icon: React.ReactNode
    value: string | number
    label: string
}

const InfoBox: React.FC<InfoBoxProps> = ({
    icon,
    value,
    label
}) => {
    return (
        <div className='flex flex-col space-y-1 border border-dark-shade-400 border-dashed p-2'>
            <div className='flex flex-row space-x-1'>
                <div>{icon}</div>
                <div>{value}</div>
            </div>
            <div className='text-sm text-muted'>{label}</div>
        </div>
    )
}   