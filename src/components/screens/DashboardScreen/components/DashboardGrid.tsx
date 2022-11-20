import { AllVoteSetsByUserIdProtected } from "../../../../types/trpcOutputTypes"
import DashboardCard from "./DashboardCard"

interface Props {
    voteSets: AllVoteSetsByUserIdProtected
}

const DashboardGrid: React.FC<Props> = ({
    voteSets
}) => {
    return (
        <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {voteSets.map((set, i) => (
                <DashboardCard key={ i } { ...set } />
            ))}           
        </div>
    )
}

export default DashboardGrid