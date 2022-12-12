import MainLayout from "../../../layouts/MainLayout"
import { trpc } from "../../../utils/trpc"
import EmptyStateWrapper from "../../common/EmptyStateWrapper"
import DashboardGrid from "./components/DashboardGrid"
import DashboardHeader from "./components/DashboardHeader"

const DashboardScreen: React.FC = () => {
    const { data: voteSets, isLoading } = trpc.voteSet.getAllByUserIdProtected.useQuery()

    return (
        <MainLayout useContainer={true}>
            <DashboardHeader />
            <EmptyStateWrapper
                isLoading={isLoading}
                data={voteSets}
                NonEmptyComponent={<DashboardGrid voteSets={voteSets ?? []} />}
                EmptyComponent={<div>You have no vote sets.</div>}
            />
        </MainLayout>
    )
}

export default DashboardScreen