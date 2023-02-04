import { AllVoteSetsByUserIdProtected } from "../../../../types/trpcOutputTypes"
import { DashboardVoteSetCard } from "./DashboardVoteSetCard"

interface Props {
    voteSets: AllVoteSetsByUserIdProtected
}

const DashboardGrid: React.FC<Props> = ({
    voteSets
}) => {
    return (
        <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
            {voteSets.map((set, i) => (
                <DashboardVoteSetCard key={set.id} {...set} />
            ))}
        </div>
    )
}

export default DashboardGrid