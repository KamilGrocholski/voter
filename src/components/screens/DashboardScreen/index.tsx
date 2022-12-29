import MainLayout from "../../../layouts/MainLayout"
import { trpc } from "../../../utils/trpc"
import EmptyStateWrapper from "../../common/EmptyStateWrapper"
import DashboardGrid from "./components/DashboardGrid"
import DashboardHeader from "./components/DashboardHeader"

const DashboardScreen: React.FC = () => {
    const { data: voteSets, isLoading, isError } = trpc.voteSet.getAllByUserIdProtected.useQuery()

    return (
        <MainLayout useContainer={true}>
            <DashboardHeader />
            <EmptyStateWrapper
                isLoading={isLoading}
                isError={isError}
                data={voteSets}
                NonEmptyComponent={(data) => <DashboardGrid voteSets={data} />}
                EmptyComponent={<div>You have no vote sets.</div>}
            />
        </MainLayout>
    )
}

export default DashboardScreen